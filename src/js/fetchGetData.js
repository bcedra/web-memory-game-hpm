export async function getData(searchvalue) {
	const url = 'https://stage.helpdesk.hypertalk.net/api/operators?search=' + searchvalue;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		return json.value;
	} catch (error) {
		console.error(error.message);
	}
}

export async function searchOperators() {
	const input = document.getElementById('searchInput').value;

	const operators = await getData(input);

	console.log(operators);

	if (operators.length == 0) {
		document.getElementById('no-data-message').hidden = false;
	} else {
		document.getElementById('no-data-message').hidden = true;
	}

	displayOperators(operators);
}

export function addSearchListeners() {
	document.getElementById('searchbtn').addEventListener('click', searchOperators);

	document.getElementById('searchInput').addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			searchOperators();
		}
	});
}

export function displayOperators(operators) {
	const gridContainerElement = document.getElementById('grid-container');
	gridContainerElement.innerHTML = '';
	operators.forEach((operator) => {
		const div = document.createElement('div');
		div.textContent = operator.name;
		gridContainerElement.appendChild(div);
	});

	console.log(gridContainerElement);
}
