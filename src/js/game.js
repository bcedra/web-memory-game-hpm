'use strict';

import { initializeTranslations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
	initializeTranslations();
	addStartListeners();
	displayUsername();
	clearErrors();
	const name = document.getElementById('name');

	name.addEventListener('blur', onNameBlur);
});

var timerInterval;
var sec = 0;
var min = 0;
var size;
var failedPairs = '0';
var categorySelectedByUser;

function difficulty() {
	const settingsJSON = JSON.parse(localStorage.getItem('settingsJSON'));
	const difficultySelected = settingsJSON.difficultySelected;

	switch (difficultySelected) {
		case 'easy':
			size = 4;
			break;
		case 'hard':
			size = 6;
			break;
		default:
			size = 4;
			break;
	}

	localStorage.setItem('difficulty', difficultySelected);
}

function category() {
	const categoryJSON = JSON.parse(localStorage.getItem('settingsJSON'));
	const categorySelected = categoryJSON.categorySelected;

	switch (categorySelected) {
		case 'numbers':
			categorySelectedByUser = 1;
			break;
		case 'fruits':
			categorySelectedByUser = 2;
			break;
		case 'flags':
			categorySelectedByUser = 3;
			break;
		default:
			categorySelectedByUser = 1;
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
	failedPairs = 0;
	lockBoard = false;
	flippedCards = [];
	cardsArr = [];
	displayFails();
	createTable();
	timer();
}

function handleStartButton() {
	clearErrors();
	let hasError = false;

	const username = document.getElementById('name').value.trim();
	const avatar = document.getElementById('avatar').src;

	if (!username) {
		setError('name');
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
		category();
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

function displayFails() {
	document.getElementById('failed-pairs').textContent = ` ${failedPairs}`;
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

			if (categorySelectedByUser === 1) {
				back.textContent = number;
			} else if (categorySelectedByUser === 2) {
				var img = document.createElement('img');
				img.src = `../assets/Fruits/${number}.png`;
				back.appendChild(img);
			} else {
				var img = document.createElement('img');
				img.src = `../assets/Countries/${number}.png`;
				back.appendChild(img);
			}

			flip.appendChild(front);
			flip.appendChild(back);
			card.appendChild(flip);

			cell.appendChild(card);
			row.appendChild(cell);

			flip.addEventListener('click', function () {
				if (lockBoard || this.classList.contains('flipped')) return;

				document.querySelectorAll('.flip.selected').forEach((card) => {
					card.classList.remove('selected');
				});

				this.classList.add('flipped', 'selected');
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

	if (categorySelectedByUser === 1) {
		if (first.querySelector('.back').textContent === second.querySelector('.back').textContent) {
			matchedAndReset(true);
		} else {
			lockBoard = true;
			failedPairs++;
			displayFails();

			localStorage.setItem('attempts', failedPairs.toString());

			setTimeout(() => {
				first.classList.remove('flipped', 'selected');
				second.classList.remove('flipped', 'selected');
				matchedAndReset(false);
			}, 400);
		}
	} else {
		//daca e img
		if (first.querySelector('.back img').src === second.querySelector('.back img').src) {
			matchedAndReset(true);
		} else {
			lockBoard = true;
			failedPairs++;
			displayFails();

			localStorage.setItem('attempts', failedPairs.toString());

			setTimeout(() => {
				first.classList.remove('flipped', 'selected');
				second.classList.remove('flipped', 'selected');
				matchedAndReset(false);
			}, 400);
		}
	}
}

function matchedAndReset() {
	flippedCards = [];
	lockBoard = false;

	if (checkMatch) {
		document.querySelectorAll('.flip.selected').forEach((card) => {
			card.classList.remove('selected');
		});
	}

	checkIfAllCardsMatched();
}

function checkIfAllCardsMatched() {
	const allCardsFlipped = cardsArr.every((card) => card.querySelector('.flip').classList.contains('flipped'));
	if (allCardsFlipped) {
		clearInterval(timerInterval); //stop the timer

		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.8 },
		});

		const timeInSeconds = min * 60 + sec;
		localStorage.setItem('time_in_seconds', timeInSeconds.toString());

		const username = localStorage.getItem('username');
		const difficulty = localStorage.getItem('difficulty');
		const time_in_seconds = localStorage.getItem('time_in_seconds');
		const attempts = localStorage.getItem('attempts');

		const data = {
			username: username,
			difficulty: difficulty,
			time_in_seconds: parseInt(time_in_seconds, 10),
			attempts: parseInt(attempts, 10),
		};

		fetch('http://localhost:3000/leaderboard', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((succ) => {
				console.log('Success', succ);
			})
			.catch((err) => {
				console.error('Error', err);
			});
	}
}

function setError(elementId) {
	const element = document.getElementById(elementId);
	element.classList.add('input-error');
}

function clearErrors() {
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

function onNameBlur() {
	if (document.getElementById('name')) {
		clearErrors();
	}
}

window.onload = function () {
	const savedAvatar = localStorage.getItem('selectedAvatar');

	if (savedAvatar) {
		document.getElementById('avatar').src = savedAvatar;
		document.getElementById('user-avatar').src = savedAvatar;
	}
};
