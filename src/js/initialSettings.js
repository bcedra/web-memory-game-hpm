export function defaultSettings() {
	const settingsJSON = localStorage.getItem('settingsJSON');

	if (!settingsJSON) {
		const defaultSettings = {
			languageSelected: 'en',
			difficultySelected: 'easy',
			categorySelected: 'numbers',
		};

		localStorage.setItem('settingsJSON', JSON.stringify(defaultSettings));
	}
}
