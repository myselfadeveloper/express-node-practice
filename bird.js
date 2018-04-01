// using router-level middleware
const express = require('express');
const birdrouter = express.Router();

// middleware for this router
birdrouter.use((req, res, next) => {
    console.log('Bird router time: ', Date.now())
    next()
});

// homepage router
birdrouter.get('/', (req, res) => res.send('Bird Home'));

// about router
birdrouter.get('/aboutbird', (req, res) => res.send('Birds about'));

// sample birds data
birdrouter.get('/birds-list/:bird-:colour-:endangered-:harmful', (req, res) => res.send(req.params));

module.exports  = birdrouter