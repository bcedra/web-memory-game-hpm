async function uploadLeaderboard(difficulty = 'hard') {
	try {
		const response = await fetch(`http://localhost:3000/leaderboard?difficulty=${difficulty}`);
		const data = await response.json();
		createTable(data);
	} catch (error) {
		console.error('Error', error);
	}
}

function createTable(leaderboardData) {
	var col = '';
	leaderboardData.forEach((itemData) => {
		col += '<tr>';
		col += '<td>' + itemData.username + '</td>';
		col += '<td>' + itemData.difficulty + '</td>';
		col += '<td>' + itemData.time_in_seconds + '</td>';
		col += '<td>' + itemData.attempts + '</td>';
		col += '</tr>';
	});
	document.getElementById('data').innerHTML = col;
}

uploadLeaderboard();

document.getElementById('sort-selector').addEventListener('change', () => {
	const sortByDifficulty = document.getElementById('sort-selector').value;

	fetch(`http://localhost:3000/leaderboard?difficulty=${sortByDifficulty}`)
		.then((res) => res.json())
		.then((data) => {
			createTable(data);
			console.log('Success', data);
		})
		.catch((err) => {
			console.error('Error', err);
		});
});
