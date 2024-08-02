'use strict';

import { addSearchListener, doSearch } from './fetch.js';
document.addEventListener('DOMContentLoaded', async () => {
	doSearch();
	addSearchListener();
});
