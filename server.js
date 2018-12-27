/**
 * Node-Express
 * 
 * A learning project
 * usage:   debug=*& nodemon server.js (bash); set debug=*& nodemon server.js (windows)
 *          nodemon server.js
 *          node server.js
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
//const session = require('express-session');
const session = require('cookie-session');
const passportSetup = require('./config/passport-setup')();
const authRoutes = require('./routes/auth-routes');
const keys = require('./config/keys');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
//app.set('views', 'views');

// jquery
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery/dist')));
// bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap/dist/js')));
// font-awesome
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'font-awesome/css')));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules', 'font-awesome/fonts')));

// TODO: if session is really important we need a strategy to handle saving and loading session data
// Right now I don't really care for session data
app.use(session({
    maxAge: keys.session.maxAge,
    //secret: keys.session.keys[0],     // unused: handled with 'Keys'
    keys: keys.session.keys,
    resave: false,
    saveUninitialized: false,
    name: keys.session.name,
    //secure: true,                     // TODO: uncomment when using https
    httpOnly: true,
    sameSite: 'strict',
    domain: keys.session.domain,
    path: keys.session.path,
    expires: new Date(Date.now() * keys.session.expires)
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes.router);
app.use(morgan('tiny'));    // dev, tiny, combined


app.get('/', (req, res) => {
    res.render('index', {user: req.user});
});

app.get('/profile', authRoutes.isAuthenticated, (req, res) => {
    res.render('profile', {user: req.user});
})


app.listen(keys.server.port, () => {
    console.log(`server started and listening on port ${keys.server.port}`);
});
