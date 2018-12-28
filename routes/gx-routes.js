/**
 * gx-routes.js
 * @desc - This handles the authentication routes for OAuth2.0 to GX.
 */
const base64 = require('base-64');
const express = require('express');
const passport = require('passport');
const keys = require('../config/keys');
const router = express.Router();


let passClientIdSecret = ((req, res, next) => {
    // base64 of client id and secret
    let b64 = base64.encode(`${keys.gx.client_id}:${keys.gx.client_secret}`);
    res.header('Authorization', `Basic ${b64}`);
    next();
});

let isAuthenticated = (req, res, next) => {
    if(req.user == undefined)
        res.render('/login');
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
router.get('/auth', passClientIdSecret, passport.authenticate('oauth2', {
    // the list of gx scopes: ['email', 'openid', 'phone', 'profile', 'roles', 'user_attributes'] or just ['UserProfile.me']
    scope: ['UserProfile.me']
}));

// we have 'code' now get 'accessToken' and 'profile'
router.get('/auth/callback', passport.authenticate('oauth2'), (req, res) => {
    const user = req.user || req.session.passport.user;
    if(user != undefined) {
        res.render('profile', {user: user});
    }
    else {
        res.redirect('/login');
    }
});


module.exports = {
    router,
    isAuthenticated
};
