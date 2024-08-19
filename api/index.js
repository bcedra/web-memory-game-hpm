require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = process.env.API_PORT || 3000;
const pool = mysql.createPool({
	host: 'localhost',
	port: 3307,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	connectionLimit: 10,
});

async function main() {
	// starting the server:
	try {
		// database connect
		var database = await pool.getConnection();
		console.log('Connected to the MySQL database');

		// REST init
		await new Promise((resolve, reject) => {
			const rest = app.listen(port, () => {
				console.log(`Server is running on http://localhost:${port}`);
				resolve();
			});
			rest.on('error', reject);
		});
	} catch (err) {
		console.error('Error:', err);
	}

	// create ledearboard table
	await database.execute(`
      CREATE TABLE IF NOT EXISTS leaderboard (
        username VARCHAR(50),
        difficulty VARCHAR(50),
        time_in_seconds INT NOT NULL CHECK (time_in_seconds > 0),
        attempts INT NOT NULL CHECK (attempts > 0)
      );
    `);
	console.log('Leaderboard table created or already exists.');

	app.use(
		express.json({
			limit: '1mb',
		}),
	);
	app.use(cors());

	// routes
	app.get('/hello-world', (req, res) => {
		res.send('Hello World');
	});

	app.post('/hello-world', (req, res) => {
		res.send(req.body);
	});

	app.post('/leaderboard', async (req, res) => {
		const { username, difficulty, time_in_seconds, attempts } = req.body;

		// check if all fields have a value
		if (!username || !difficulty || !time_in_seconds || !attempts) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		try {
			//  insert data into table
			await pool.execute(`INSERT INTO leaderboard (username, difficulty, time_in_seconds, attempts) VALUES ("${username}", "${difficulty}", ${time_in_seconds}, ${attempts})`);

			// success code
			return res.status(200).json({ message: 'Leaderboard entry successful' });
		} catch (error) {
			// error code
			console.error('Error:', error);
			return res.status(500).json({ error: 'Error' });
		}
	});

	app.get('/leaderboard', async (req, res) => {
		const [n] = await pool.query('SELECT * FROM leaderboard');
		res.json(n);
	});
}

main();
