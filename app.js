const express = require('express');
const app = express();
const bird = require('./bird');

// Use a middleware function before going to homepage
app.use((req, res, next) => {
    console.log('LOGGED IN')
    next()
});

// get
app.get('/', (req, res) => res.send('Home Page'));

// post
app.post('/', (req, res) => res.send('Its a Post'));

// returns a json obj as per requested params
app.get('/roadtrip/:start-:stop', (req, res) => res.send(req.params));

// uses routes impirted from bird.js
app.use('/bird', bird);

// serve static resources
app.use(express.static('public'));

// also serves static, but with a different path
app.use('/static', express.static('public'));
app.listen(3000, () => console.log('Listening on 3000;'));