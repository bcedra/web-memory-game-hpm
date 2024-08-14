'use strict';

import { initializeTranslations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
	initializeTranslations();
	addStartListeners();
	displayUsername();
});

var timerInterval;
var sec = 0;
var min = 0;
var size;

function difficulty() {
	const settingsJSON = JSON.parse(localStorage.getItem('settingsJSON'));
	const difficultySelected = settingsJSON.difficultySelected;

	switch (difficultySelected) {
		case 'easy':
			size = 4;
			break;
		case 'medium':
			size = 6;
			break;
		case 'hard':
			size = 8;
			break;
		default:
			size = 4;
			break;
	}
}

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
}

function handleReplayButton() {
	resetTimer();
	createTable();
	timer();
}

function handleStartButton() {
	clearErrors();
	let hasError = false;

	const username = document.getElementById('name').value.trim();
	const avatar = document.getElementById('avatar').src;

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
		document.getElementById('user-avatar').src = avatar;

		localStorage.setItem('username', username);
		localStorage.setItem('selectedAvatar', avatar);

		document.getElementById('setup-screen').hidden = true;
		document.getElementById('game-screen').hidden = false;

		difficulty();
		resetTimer();
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
var cardsArr = [];

function createTable() {
	const settingsJSON = JSON.parse(localStorage.getItem('settingsJSON'));
	const difficultySelected = settingsJSON.difficultySelected;

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
			flip.classList.add('flip');

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
				if (lockBoard || this.classList.contains('flipped')) return;

				this.classList.add('flipped');
				flippedCards.push(this);

				if (flippedCards.length === 2) checkMatch();
			});

			cardsArr.push(card);
		}
		table.appendChild(row);
		tableData.push(rowData);
	}
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

function matchedAndReset() {
	flippedCards = [];
	lockBoard = false;
	checkIfAllCardsMatched();
}

function checkIfAllCardsMatched() {
	const allCardsFlipped = cardsArr.every((card) => card.querySelector('.flip').classList.contains('flipped'));
	if (allCardsFlipped) {
		clearInterval(timerInterval); //stop the timer
		//alert('Felicitari!');
	}
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
const avatars = ['assets/avatars/1.png', 'assets/avatars/2.png', 'assets/avatars/3.png', 'assets/avatars/4.png', 'assets/avatars/5.png'];

let currentAvatar = 0;
const avatarImage = document.getElementById('avatar');
const prevButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

function updateAvatar() {
	avatarImage.src = avatars[currentAvatar];
}

prevButton.addEventListener('click', function () {
	currentAvatar = currentAvatar === 0 ? avatars.length - 1 : currentAvatar - 1;
	updateAvatar();
});

nextButton.addEventListener('click', function () {
	currentAvatar = currentAvatar === avatars.length - 1 ? 0 : currentAvatar + 1;
	updateAvatar();
});
window.onload = function () {
	const savedAvatar = localStorage.getItem('selectedAvatar');

	if (savedAvatar) {
		document.getElementById('avatar').src = savedAvatar;
		document.getElementById('user-avatar').src = savedAvatar;
	}
};
