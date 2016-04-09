'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// EXPRESS SERVER HERE //
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodoverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    passport = require('passport'),
    config = require('./config/config'),
    mongooseConfig = require('./config/mongoose'),
    db = mongooseConfig(),
    routes = require('./server/routes/routes.js');

// =========================CONFIGURATION===========================//
// =================================================================//
app.use(express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodoverride());
app.use(session({secret: "green", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}

    
// passport.use(new LocalStrategy(
//    {
//        usernameField: 'email', 
//        passwordField: 'password'
//     },
//     function(email, password, done) {
//         User.loadOne({email: email}).then(function(user) {
//             if (!user || !user.authenticate(password)) {
//                 return done(null, false, {message: 'incorrect email or password'});
//             }
//             done(null, user);
//         });
//     } 
// ));

// ==========================ROUTER=================================//
// =================================================================//

var router = express.Router();

router.get('/login', routes.login);
router.post('/user', routes.createUser);
router.post('/nutrition', routes.macroSend);
router.get('/nutrition', routes.macroGetAll);
router.get('/nutrition/:_id', routes.macroGet);
router.delete('/nutrition/:_id', routes.macroDelete);
 
 // =============WHERE TO ACCESS THE API==================== //

app.use('/', router);

module.exports = app; // This is needed otherwise Mongoose Code will not work
app.listen(config.port);
console.log(process.env.NODE_ENV + ' server running at: ' + config.port)