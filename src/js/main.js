'use strict';

import { initializeTranslations } from './translations.js';
import { uploadLeaderboard } from './leaderboard.js';

document.addEventListener('DOMContentLoaded', async () => {
	initializeTranslations();
	uploadLeaderboard();
});
