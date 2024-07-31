const DEFAULT_LANGUAGE = 'en';
const FALLBACK_LANGUAGE = 'en';

// Function to load the translation file
async function loadTranslations(language) {
	try {
		const response = await fetch(`assets/locales/${language}.json`);
		if (!response.ok) {
			throw new Error('Translation file not found');
		}
		return await response.json();
	} catch {
		// Fallback to default language if an error occurs
		return await fetch(`locales/${FALLBACK_LANGUAGE}.json`).then((response) => response.json());
	}
}

// Function to update the text content based on translations
function updateTextContent(translations) {
	document.querySelectorAll('[data-translate]').forEach((element) => {
		const key = element.getAttribute('data-translate');
		element.textContent = translations[key] || key;
	});
}

// Function to initialize translations
export async function initializeTranslations() {
	const userLanguage = navigator.language.split('-')[0];
	const language = ['en', 'ro'].includes(userLanguage) ? userLanguage : DEFAULT_LANGUAGE;

	const translations = await loadTranslations(language);
	updateTextContent(translations);
}
