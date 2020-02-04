// Dependencies
// =============================================================
const express = require('express');
const fs = require('fs');
const path = require('path');

// Sets up the Express App
// =============================================================
let app = express();
const PORT = (PORT = process.env.PORT || 8080);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
