export function saveLanguageChoice() {
	// does not change the language atm but the value is saved
	const languageSelector = document.getElementById('languageSelector');

	let settingsJSON = JSON.parse(localStorage.getItem('settingsJSON')) || {};

	if (!settingsJSON.langSelected) {
		settingsJSON.langSelected = 'english';
		localStorage.setItem('settingsJSON', JSON.stringify(settingsJSON));
	}

	if (settingsJSON.langSelected) {
		languageSelector.value = settingsJSON.langSelected;
	}

	console.log(settingsJSON.langSelected);

	languageSelector.onchange = function () {
		const langSelected = languageSelector.value;

		settingsJSON.langSelected = langSelected;
		localStorage.setItem('settingsJSON', JSON.stringify(settingsJSON));

		const storedSettings = JSON.parse(localStorage.getItem('settingsJSON'));
		console.log(storedSettings.langSelected);
	};
}

export function saveDifficultyChoice() {
	let settingsJSON = JSON.parse(localStorage.getItem('settingsJSON')) || {};

	if (!settingsJSON.difficultySelected) {
		settingsJSON.difficultySelected = 'easy';
		localStorage.setItem('settingsJSON', JSON.stringify(settingsJSON));
	}

	if (settingsJSON.difficultySelected) {
		difficultySelector.value = settingsJSON.difficultySelected;
	}

	console.log(settingsJSON.difficultySelected);

	difficultySelector.onchange = function () {
		const difficultySelected = difficultySelector.value;

		settingsJSON.difficultySelected = difficultySelected;
		localStorage.setItem('settingsJSON', JSON.stringify(settingsJSON));

		const storedSettings = JSON.parse(localStorage.getItem('settingsJSON'));
		console.log(storedSettings.difficultySelected);
	};
}

export function saveCategoryChoice() {
	let settingsJSON = JSON.parse(localStorage.getItem('settingsJSON')) || {};

	if (!settingsJSON.categorySelected) {
		settingsJSON.categorySelected = '1';
		localStorage.setItem('settingsJSON', JSON.stringify(settingsJSON));
	}

	if (settingsJSON.categorySelected) {
		categorySelector.value = settingsJSON.categorySelected;
	}

	console.log(settingsJSON.categorySelected);

	categorySelector.onchange = function () {
		const categorySelected = categorySelector.value;

		settingsJSON.categorySelected = categorySelected;
		localStorage.setItem('settingsJSON', JSON.stringify('settingsJSON'))

		const storedSettings = JSON.parse(localStorage.getItem('settingsJSON'));
		console.log(storedSettings.categorySelected);
	};
}
