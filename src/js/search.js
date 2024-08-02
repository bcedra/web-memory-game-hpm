export async function getData(searchvalue) {
	const dataURL = 'https://stage.helpdesk.hypertalk.net/api/operators?search=' + searchvalue;
	try {
		const response = await fetch(dataURL);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		return json.value;
	} catch (error) {
		console.error(error.message);
	}
}

export async function doSearch() {
	const input = document.getElementById('inputWord').value;
	console.log(input);
	const operators = await getData(input);
	createDivs(operators);
	console.log(operators);
}

export async function addSearchListener() {
	document.getElementById('search-form').addEventListener('submit', function (event) {
		event.preventDefault();
		doSearch();
	});
}

function createDivs(operators) {
	var nameDivs = document.getElementById('list');
	nameDivs.innerHTML = '';

	operators.forEach(function (el) {
		const div = document.createElement('div');
		div.textContent = el.name;
		div.className = 'inner-divs';
		nameDivs.appendChild(div);
	});
}
