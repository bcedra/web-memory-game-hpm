export async function doSearch() {
	const searchInput = document.getElementById('search');
	const searchTerm = searchInput.value;
	const response = await fetch(`https://stage.helpdesk.hypertalk.net/api/operators?search=${searchTerm}`);
	const data = await response.json();
	const operators = data.value;
	createDivs(operators);
	console.log(operators);
}

export function addSearchListener() {
	document.getElementById('searchButton').addEventListener('click', function () {
		doSearch();
	});
}

function createDivs(operators) {
	const nameDivs = document.getElementById('myData');
	myData.innerHTML = '';

	operators.forEach(function (el) {
		const div = document.createElement('div');
		div.textContent = el.name;
		nameDivs.appendChild(div);
	});
}
