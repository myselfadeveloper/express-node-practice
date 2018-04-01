// using router-level middleware here
const express = require('express');
const birdrouter = express.Router();

// middleware for this router
birdrouter.use((req, res, next) => {
    console.log('Bird router time: ', Date.now())
    next()
});

// homepage router
birdrouter.get('/', (req, res) => {
    console.log('get req for bird home page')
    res.send('Bird Home')
});

// about router
birdrouter.get('/aboutbird', (req, res) => {
    console.log('get req for /aboutbird')
    res.send('Birds about')
});

// sample birds data
birdrouter.get('/birds-list/:bird-:colour-:endangered-:harmful', (req, res) => res.send(req.params));

module.exports  = birdrouter