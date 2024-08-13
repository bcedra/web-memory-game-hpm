'use strict';

import { initializeTranslations } from './translations.js';
import { uploadLeaderboard } from './leaderboard.js';
import { defaultSettings } from './initialSettings.js';

document.addEventListener('DOMContentLoaded', () => {
	defaultSettings();
	initializeTranslations();
	uploadLeaderboard();
});