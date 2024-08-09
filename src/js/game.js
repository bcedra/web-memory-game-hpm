'use strict';

import { initializeTranslations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
	initializeTranslations();
	addStartListeners();
	displayUsername();
});

let timerInterval;
let sec = 0;
let min = 0;

function timer() {
	const timerElement = document.getElementById('timer');

	timerInterval = setInterval(() => {
		sec++;
		if (sec === 60) {
			sec = 0;
			min++;
		}
		timerElement.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
	}, 1000);
}

function resetTimer() {
	clearInterval(timerInterval);
	sec = 0;
	min = 0;
	const timerElement = document.getElementById('timer');
	timerElement.textContent = '00:00';
	timer();
}

function handleReplayButton() {
	resetTimer();
	createTable();
}

function handleStartButton() {
	clearErrors();
	let hasError = false;

	const username = document.getElementById('name').value.trim();
	const avatar = document.getElementById('avatar').value;

	if (!username) {
		setError('name', 'Please enter your nickname!');
		hasError = true;
	}

	if (hasError) {
		return;
	}

	clearErrors();

	if (avatar) {
		document.getElementById('username').textContent = username;
		document.getElementById('user-avatar').src = 'path/to/${avatar}.png';

		localStorage.setItem('username', username);

		document.getElementById('setup-screen').hidden = true;
		document.getElementById('game-screen').hidden = false;

		timer();
		createTable();
	}
}

function displayUsername() {
	const savedUsername = localStorage.getItem('username');
	if (savedUsername) {
		document.getElementById('username').textContent = savedUsername;
	}
}

export function addStartListeners() {
	document.getElementById('start-button').addEventListener('click', handleStartButton);
	document.getElementById('replay-button').addEventListener('click', handleReplayButton);

	document.getElementById('name').addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			handleStartButton();
		}
	});
}

function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

var tableData = [];
var flippedCards = [];
var lockBoard = false;

function createTable() {
	const settingsJSON = JSON.parse(localStorage.getItem('settingsJSON'));
	const difficultySelected = settingsJSON.difficultySelected;

	let size;
	let waitsec;

	switch (difficultySelected) {
		case 'easy':
			size = 4;
			waitsec = 2000;
			break;
		case 'medium':
			size = 6;
			waitsec = 3000;
			break;
		case 'hard':
			size = 8;
			waitsec = 5000;
			break;
		default:
			size = 4;
			waitsec = 2000;
			break;
	}

	var table = document.getElementById('game-board');
	table.innerHTML = '';

	event.preventDefault();

	var nbCells = size * size;
	var valCels = [];

	for (var i = 1; i <= nbCells / 2; i++) {
		valCels.push(i, i);
	}

	valCels = shuffle(valCels);

	for (let i = 0; i < size; i++) {
		var rowData = [];
		var row = document.createElement('tr');

		for (let j = 0; j < size; j++) {
			var cell = document.createElement('td');

			var number = valCels.pop();

			var card = document.createElement('div');
			card.classList.add('card');

			var flip = document.createElement('div');
			flip.classList.add('flip', 'flipped');

			var front = document.createElement('div');
			front.classList.add('front');

			var back = document.createElement('div');
			back.classList.add('back');

			back.textContent = number;

			flip.appendChild(front);
			flip.appendChild(back);
			card.appendChild(flip);

			cell.appendChild(card);
			row.appendChild(cell);

			flip.addEventListener('click', function () {
				if (lockBoard) return;

				this.classList.add('flipped');
				flippedCards.push(this);

				if (flippedCards.length === 2) checkMatch();
			});
		}
		table.appendChild(row);
		tableData.push(rowData);
	}

	setTimeout(() => {
		const allFlippedOnFront = document.querySelectorAll('.flip');
		allFlippedOnFront.forEach((flip) => flip.classList.remove('flipped'));
	}, waitsec); //cate milsec in functie de dificultate
}

function checkMatch() {
	const [first, second] = flippedCards;

	if (first.querySelector('.back').textContent === second.querySelector('.back').textContent) {
		matchedAndReset(true);
	} else {
		lockBoard = true;
		setTimeout(() => {
			first.classList.remove('flipped');
			second.classList.remove('flipped');
			matchedAndReset(false);
		}, 1000);
	}
}

function matchedAndReset(matched) {
	flippedCards = [];
	lockBoard = false;
}

function setError(elementId, message) {
	const element = document.getElementById(elementId);
	const errorElement = document.createElement('span');
	errorElement.className = 'error-message';
	errorElement.textContent = message;
	element.parentElement.appendChild(errorElement);
	element.classList.add('input-error');
}

function clearErrors() {
	const errorMessages = document.querySelectorAll('.error-message');
	errorMessages.forEach((msg) => msg.remove());

	const inputElements = document.querySelectorAll('.input-error');
	inputElements.forEach((el) => el.classList.remove('input-error'));
}
