'use strict';

import { initializeTranslations } from './translations.js';
import { getData } from './fetchGetData.js';
import { searchOperators } from './fetchGetData.js';
import { displayOperators } from './fetchGetData.js';



document.addEventListener('DOMContentLoaded', () => {
	initializeTranslations();

	searchOperators();

	getData().then(data => {
		displayOperators(data.value)
	});
	
	console.log('Hello World!');
});
