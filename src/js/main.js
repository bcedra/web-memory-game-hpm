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

	var ro = document.getElementById("ro_language");
	var en = document.getElementById("en_language");
  
	if(ro.checked == true){
	  initializeTranslations('ro');
	} 
	else if(en.checked == true){
	  initializeTranslations('en');
	}
	else{
	  //ceva default
	  initializeTranslations('en');
	}
	
	console.log('Hello World!');
});
