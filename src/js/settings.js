import { changeLang } from './translations.js';

function saveSettings() {
	const languageSelected = document.getElementById('languageSelector').value;
	const difficultySelected = document.getElementById('difficultySelector').value;
	const categorySelected = document.getElementById('categorySelector').value;

	const settings = {
		languageSelected: languageSelected,
		difficultySelected: difficultySelected,
		categorySelected: categorySelected,
	};

	if (languageSelected) {
		changeLang(languageSelected);
	}

	const settingsJSON = JSON.stringify(settings);
	localStorage.setItem('settingsJSON', settingsJSON);
}

function loadSettings() {
	const settingsJSON = localStorage.getItem('settingsJSON');

	if (settingsJSON) {
		const settings = JSON.parse(settingsJSON);
		document.getElementById('languageSelector').value = settings.languageSelected;
		document.getElementById('difficultySelector').value = settings.difficultySelected;
		document.getElementById('categorySelector').value = settings.categorySelected;
	} else {
		setDefaultValues();
	}
}

function addChangeListeners() {
	document.getElementById('languageSelector').addEventListener('change', saveSettings);
	document.getElementById('difficultySelector').addEventListener('change', saveSettings);
	document.getElementById('categorySelector').addEventListener('change', saveSettings);

	window.addEventListener('load', loadSettings);
}

addChangeListeners();
