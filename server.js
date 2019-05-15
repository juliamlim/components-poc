const express = require('express');
const app = express();

const routes = require('./routes');

const port = 4200;

// Set up server
app.listen(port, () => console.log(`SF Themes are running on http://localhost:${port}`));

// Set view engine
app.set('view engine', 'ejs');

// Set static files directory
app.use(express.static('dist'));

// Set up routes
app.use('/', routes);
