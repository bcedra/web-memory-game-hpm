async function uploadLeaderboard() {
	fetch('https://stage.helpdesk.hypertalk.net/api/operators').then((res) => {
		res.json().then((data) => {
			const operators = data.value;
			createTable(operators);
			console.log(operators);
		});
	});
}

function createTable(operators) {
	var col = '';
	operators.forEach((itemData) => {
		col += '<tr>';
		col += '<td>' + itemData._id + '</td>';
		col += '<td>' + itemData.name + '</td>';
		col += '<td>' + itemData.email + '</td></tr>';
	});
	document.getElementById('data').innerHTML = col;
}
uploadLeaderboard();
