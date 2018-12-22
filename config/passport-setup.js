
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

let users = {};

function findOrCreateUser(user, done) {
    if(users[user.id] != undefined) {
        done(null, users[user.id])
    }
    else {
        users[id] = user;
        done(null, user);
    }
}

passport.use(new GoogleStrategy({
    clientID: keys.google.client_id,
    clientSecret: keys.google.client_secret,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    console.log('request', request);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);

    findOrCreateUser(profile, done);
}));

passport.serializeUser((user, done) => {
    users[user.id] = user;
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    if(users[id] != undefined) {
        done(null, users[id]);
    }
    else
        done(null, false);
})