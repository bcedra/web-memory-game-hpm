'use strict';

import { initializeTranslations } from './translations.js';
import { saveLanguageChoice, saveDifficultyChoice, saveCategoryChoice } from './settings.js'

document.addEventListener('DOMContentLoaded', () => {
	initializeTranslations();
	saveLanguageChoice();
	saveDifficultyChoice();
	saveCategoryChoice();
});
