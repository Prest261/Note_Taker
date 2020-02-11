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
	fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
		console.log(data);
		if (err) throw err;
		// console.log('res', res);
		const note = JSON.parse(data);
		return res.json(note);
	});
});

// route that pulls up specific notes if clicked
// app.get('/api/notes/:id', function(req, res) {
// 	let chosen = req.params.id;
// 	const dataJSON = fs.readFile('./Develop/db/db.json');
// 	const note = JSON.parse(dataJSON);
// 	console.log(chosen);
// 	console.log(note);

// 	for (var i = 0; i < note.length; i++) {
// 		if (id === note[i].id) {
// 			return res.json(note[i]);
// 		}
// 	}
// });

// Create New Notes - takes in JSON input
app.post('/api/notes', function(req, res) {
	// req.body hosts is equal to the JSON post sent from the user
	let newNote = req.body;
	// push user input into the data file
	if (data.length === 0) {
		var id = 1;
	} else {
		var id = parseInt(data[data.length - 1].id) + 1;
	}
	newNote.id = id;
	data.push(newNote);
	console.log(newNote);
	// calls the function to write the data into the file
	writeNote();
	// returns the data
	return res.json(data);
});

app.delete('/api/notes/:id', function(req, res) {
	// eliminate the id from the data array
	//var newData = data.filter(note => note.id !== req.params.id)
	var newData = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i].id !== parseInt(req.params.id)) {
			newData.push(data[i]);
		}
	}
	data = newData;
	writeNote();
	res.json(data);
	// write the array
});

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
