/**
 * passport-setup.js
 * @desc - This module sets up passport and the google oauth20 stategy.
 * usage: 
 *  const passportSetup = require('./config/passport-setup')();
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

module.exports = function() {

    // this would be our database
    let users = {};

    /**
     * @name findOrCreateUser
     * @desc - This method finds a user within the stored users. If no user is found then we create a new user.
     * @param {*} profile - the user to find or create.
     */
    function findOrCreateUser(profile) {
        if(users[profile.id] == undefined)
            users[profile.id] = profile;
        return users[profile.id];
    };

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((obj, done) => {
        let user = users[obj];
        if(user != undefined)
            done(null, user);
        else
            done(null, false);
    });

    passport.use(new GoogleStrategy({
            clientID: keys.google.client_id,
            clientSecret: keys.google.client_secret,
            callbackURL: keys.google.redirect_url,
            passReqToCallback: true
        }, (request, accessToken, refreshToken, profile, done) => {
            let user = findOrCreateUser(profile, done);
            if(user != undefined)
                done(null, user);
            else
                done(null, false);
    }));
};
