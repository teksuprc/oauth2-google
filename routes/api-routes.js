/**
 * api-routes.js
 * @desc - This handles the application programming interface (API) routes for DynamoDB.
 */
const express = require('express');
const router = express.Router();
const version = '0.0.1';

const randomMessage = [
    'Everyone lovers the puppies',
    'They don\'t like it that way',
    'Merry Holidays to you and yours',
    'I put lotion in the baskets',
    'I used all of the lotions',
    'Rub the flower, it\'ll make you feel better'
]

// need to validate the actual user w/ the req.user
let isAuthenticated = (req, res, next) => {
    if(req.user == undefined)
        res.redirect('/auth/login');
    else 
        next();
};

router.get('/', isAuthenticated, (req, res) => {
    res.render('api', {user: req.user, data: {version: null, message: null}});
});

router.get('/messages', isAuthenticated, (req, res) => {
    let msg = randomMessage[Math.floor((Math.random() * randomMessage.length))];
    let data = {version: version, message: msg};
    res.render('api', {user: req.user, data: data});
});

router.get('/message/:id', isAuthenticated, (req, res) => {
    let id = req.params.id;
    let msg = randomMessage[Math.floor((Math.random() * randomMessage.length))];
    let data = {version: version, message: `${msg} - ${id}`};
    res.render('api', {user: req.user, data: data});
});

router.put('/message', isAuthenticated, (req, res) => {
    res.json({user: req.user, data: {version: version, message: 'putting message'}});
});


module.exports = {
    router,
    version
};
