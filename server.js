/**
 * Node-Express
 * 
 * A learning project
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const debug = require('debug');     // usage: set DEBUG=*& node server.js
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');

const port = 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// jquery
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery/dist')));
// bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap/dist/js')));
// font-awesome
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'font-awesome/css')));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules', 'font-awesome/fonts')));
app.use(morgan('tiny'));    // dev, tiny, combined

app.set('view engine', 'ejs');
//app.set('views', 'views');

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
    //res.send('welcome');
    res.render('index');
});


app.listen(port, () => {
    console.log(`server started and listening on port ${port}`);
});

