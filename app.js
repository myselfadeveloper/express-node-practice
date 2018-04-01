const express = require('express');
const app = express();
const bird = require('./bird');

// initialize router-level middlware
const router = express.Router();

// get
app.get('/', (req, res) => {
    console.log('get req for home page')
    res.send('Home Page')
});

// post
app.post('/', (req, res) => {
    console.log('post req for root path')
    res.send('Its a Post')
});

// returns a json obj as per requested params
app.get('/roadtrip/:start-:stop', (req, res) => {
    console.log('get req for /roadtrip/:start-:stop')
    res.send(req.params)
});

// a middleware sub-stack that handles GET requests and uses next() to call next middleware function
app.get('/user/:id', (req, res, next) => {
    console.log('ID:', req.params.id)
    next()
  }, (req, res, next) => res.send('User Info')
);
  
// handler for the /user/:id path, which prints the user ID
app.get('/users/:id', (req, res, next) => {
    console.log('req.params.id is: ', req.params.id)
    res.end('the id won\'t display as the (res.end) is called : => ', req.params.id)
});

// ------- Application-level middleware --------

// Use a middleware function without mount path, executes for every request
// app.use((req, res, next) => {
//     console.log('a middleware function without mount path, executes for every request')
//     next()
// });

// Use a middleware function with a mount path, executes only for that path
// app.use('/middleware', (req, res, next) => {
//     console.log('a middleware function with a mount path, executes only for that path')
//     next()
// });

// skip the rest of the middleware functions from a router middleware stack, call next('route') to pass control to the next route
app.get('/userid/:id', (req, res, next) => {
    // if the user ID is 0, skip to the next route 
    // otherwise pass the control to the next middleware function in this stack
    req.params.id === '0' ? next('route') : next()
  }, (req, res, next) => {
    // sends a regular page
    res.send('regular')
});
  
// handler for the /user/:id path, which sends a special page
app.get('/userid/:id', (req, res, next) => {
    console.log('Get req passed after the condition is met for /userid/:id')
    res.send('special')
});



// uses routes impirted from bird.js
app.use('/bird', bird);

// serve static resources
app.use(express.static('public'));

// also serves static, but with a different path
app.use('/static', express.static('public'));
app.listen(3000, () => console.log('Listening on 3000;'));