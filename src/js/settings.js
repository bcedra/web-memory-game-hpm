function setDefaultValues() {
	const defaultSettings = {
		languageSelected: 'en',
		difficultySelected: 'easy',
		categorySelected: 'numbers',
	};

	document.getElementById('languageSelector').value = defaultSettings.languageSelected;
	document.getElementById('difficultySelector').value = defaultSettings.difficultySelected;
	document.getElementById('categorySelector').value = defaultSettings.categorySelected;

	localStorage.setItem('settingsJSON', JSON.stringify(defaultSettings));
}

function saveSettings() {
	const languageSelected = document.getElementById('languageSelector').value;
	const difficultySelected = document.getElementById('difficultySelector').value;
	const categorySelected = document.getElementById('categorySelector').value;

	const settings = {
		languageSelected: languageSelected,
		difficultySelected: difficultySelected,
		categorySelected: categorySelected,
	};

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

document.getElementById('languageSelector').addEventListener('change', saveSettings);
document.getElementById('difficultySelector').addEventListener('change', saveSettings);
document.getElementById('categorySelector').addEventListener('change', saveSettings);

window.addEventListener('load', loadSettings);
