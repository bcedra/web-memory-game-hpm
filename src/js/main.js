'use strict';

import { initializeTranslations } from './translations.js';
import { addStartListeners } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
	initializeTranslations();

	addStartListeners();

	console.log('Hello World!');
});
