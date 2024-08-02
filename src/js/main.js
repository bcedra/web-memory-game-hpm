'use strict';

import { initializeTranslations } from './translations.js';
import { getData } from './fetchGetData.js';
import { addSearchListeners } from './fetchGetData.js';
import { displayOperators } from './fetchGetData.js';

document.addEventListener('DOMContentLoaded', async () => {
	initializeTranslations();

	addSearchListeners();

	const operators = await getData('');
	displayOperators(operators);
});
