// Dependencies
// =============================================================
const express = require('express');
const fs = require('fs');
const path = require('path');

// Sets up the Express App
// =============================================================
let app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

let data = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8'));
console.log(data);

// Routes
// =============================================================

// Basic route that sends the user first to the index Page
app.get('/', (req, res) => {
	// console.log(res);
	res.sendFile(path.join(__dirname, './public/assets/index.html'));
});

// route that sends the user to the notes page
app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, './public/assets/notes.html'));
});

// route that pulls notes from the db.json file
app.get('/api/notes', function(req, res) {
	fs.readFile('./Develop/db/db.json', (err, data) => {
		if (err) throw err;
		console.log('res', res);
		return res.json(data);
	});
});

// Create New Notes - takes in JSON input
app.post('/api/notes', function(req, res) {
	// req.body hosts is equal to the JSON post sent from the user
	let newNote = req.body;
	// push user input into the data file
	data.push(newNote);
	console.log(newNote);
	// calls the function to write the data into the file
	writeNote();
	// returns the data
	return res.json(data);
});

app.delete('/api/notes/:id', function(req, res) {});

function writeNote() {
	fs.writeFile('./Develop/db/db.json', JSON.stringify(data), (err) => {
		if (err) throw err;
	});
}
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});
