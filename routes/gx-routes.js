/**
 * gx-routes.js
 * @desc - This handles the authentication routes for OAuth2.0 to GX.
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
router.get('/auth', passport.authenticate('gx', {
    // the list of gx scopes: ['email', 'openid', 'phone', 'profile', 'roles', 'user_attributes'] or just ['UserProfile.me']
    scope: ['UserProfile.me']
}));

// we have 'code' now get 'accessToken' and 'profile'
router.get('/auth/callback', passport.authenticate('gx'), (req, res) => {
    const user = req.user || req.session.passport.user;
    if(user != undefined) {
        res.render('profile', {user: user});
    }
    else {
        res.redirect('/login');
    }
});

let isAuthenticated = (req, res, next) => {
    if(req.user == undefined)
        res.render('/login');
    else 
        next();
};

module.exports = {
    router,
    isAuthenticated
};
