'use strict';

import { initializeTranslations } from './translations.js';
import { addInputsChangeEvents } from './settings.js';

document.addEventListener('DOMContentLoaded', () => {
	initializeTranslations();
	addInputsChangeEvents();
});
