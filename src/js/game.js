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
	//aici mai vine si functia cu generarea cardurilor
}

function handleStartButton() {
	const ursername = document.getElementById('name').value;
	const avatar = document.getElementById('avatar').value;
	if (username && avatar) {
		document.getElementById('username').textContent = username;
		document.getElementById('user-avatar').src = 'path/to/${avatar}.png';
		document.getElementById('setup-screen').hidden = true;
		document.getElementById('game-screen').hidden = false;
		timer();
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
