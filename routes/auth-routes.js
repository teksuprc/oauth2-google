/**
 * auth-routes.js
 * @desc - This handles the authentication routes for OAuth2.0 to Google.
 */
const base64 = require('base-64');
const express = require('express');
const passport = require('passport');
const keys = require('../config/vcap-utils');

const router = express.Router();


let passClientIdSecret = ((req, res, next) => {
    // base64 of client id and secret
    let b64 = base64.encode(`${keys.gx.client_id}:${keys.gx.client_secret}`);
    res.header('Authorization', `Basic ${b64}`);
    next();
});

let isAuthenticated = (req, res, next) => {
    if(req.user == undefined)
        res.redirect('/auth/login');
    else 
        next();
};


router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// get 'code'
router.get('/google', passClientIdSecret, passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// we have 'code' now get 'accessToken' and 'profile'
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    const user = req.user || req.session.passport.user;
    if(user != undefined) {
        res.render('profile', {user: user});
    }
    else {
        res.redirect('/auth/login');
    }
});


module.exports = {
    router,
    isAuthenticated
};
