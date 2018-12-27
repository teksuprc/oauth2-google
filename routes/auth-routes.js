/**
 * auth-routes.js
 * @desc - This handles the authentication routes for OAuth2.0 to Google.
 */
const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// get 'code'
router.get('/google', passport.authenticate('google', {
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

// need to validate the actual user w/ the req.user
let isAuthenticated = (req, res, next) => {
    if(req.user == undefined)
        res.redirect('/auth/login');
    else 
        next();
};

module.exports = {
    router,
    isAuthenticated
};
