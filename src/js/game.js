'use strict';

import { initializeTranslations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
	initializeTranslations();
	addStartListeners();
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
	const ursername = document.getElementById('name').value.trim();
	const avatar = document.getElementById('avatar').value;

	if (username.length == 0) {
		alert('Please enter a nickname.');
		return;
	}

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

	displayUsername();
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

function createTable() {
	const settingsJSON = JSON.parse(localStorage.getItem('settingsJSON'));
	const difficultySelected = settingsJSON.difficultySelected;

	let size;
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
			card.textContent = number;

			cell.appendChild(card);
			row.appendChild(cell);
		}
		table.appendChild(row);
		tableData.push(rowData);
	}
}
