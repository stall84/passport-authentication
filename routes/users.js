const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User Model brought in from up a directory models/users where it's being exported
const User = require('../models/User')

// Login Page
router.get('/login', (req,res,next) => {
    res.render('login')
})

// Register Page
router.get('/register', (req,res,next) => {
    res.render('register')
})

// Register Handle
router.post('/register', (req,res,next) => {
   const { name, email, password, password2 } = req.body;
   let errors = [];

   // Check required fields
   if(!name || !email || !password || !password2) {
       errors.push({ msg: 'Please fill in all fields' });
   }
   // Check passwords match
   if(password !== password2) {
       errors.push({ msg: 'Passwords do not match' });
   }
   // Check password is at least 6 characters long
   if(password.length < 6) {
       errors.push({ msg: 'Please make password at least 6 characters long' });
   }

   if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
   } else {
       // Validation passed:   
       // Use mongoose method findOne() to first locate if user exists already in DB
       // ..using query to match the user's email to input form email as entered
       // .. this will return a promise
       User.findOne({ email: email })
        .then(user => {
            if(user) {
                // if user exists run the same render as above passing in all of the same fields
                // new error to push on if email already used by someone else
                errors.push({ msg: 'Email is already registered' })
                res.render('register', {
                    errors: errors,
                    name: name,
                    email: email,
                    password: password,
                    password2: password2
                });
                // else: create new user.. encrypt their password
                // ES6 allows if the key/property are the same, you only have to write once
                // below is exactly the same as above, just shortened (e.g email: email is now just email)
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                console.log(newUser)
                res.send('Check Console for newUser')
            }
        });

       

   }
   
});

module.exports = router;