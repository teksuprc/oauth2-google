
const express = require('express');
const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const passportSetup = require('../config/passport-setup');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    res.send('logging out');
});

// get 'code'
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// get 'accessToken' and 'profile'
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // 'code' comes back here...
    // use 'code' to get profile info
    // call passport callback function in passport-setup.js

    const user = req.user;
    if(user != undefined)
        console.log('user', user);
    res.send('you reached the callback uri');
});

module.exports = router;
