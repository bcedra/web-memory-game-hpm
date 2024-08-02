'use strict';

import { initializeTranslations } from './translations.js';
import { addSearchListener, doSearch } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
	initializeTranslations();
	doSearch();
	addSearchListener();
});
