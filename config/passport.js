const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// Load User Model
const User = require('../models/User');

// Since we're exporting the strategy function we're making in here, 
// we will be able to pass it passport from the folders we'll be bringing it into later 
//(not required at top of this file, b/c it is in others, namely in app.js where this will be brought in)
module.export = function (passport) {
    passport.use(
        new LocalStrategy( {usernameField: 'email', passwordField: 'password' })
    )



}