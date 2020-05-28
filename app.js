const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');


// Database configuration
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then( () => {
        console.log('MongoDB Connected...')
    }).catch(err => {
            console.log(`Whoops, DB not connected: ${err}`)
        })

const PORT = process.env.PORT || 5000;



// EJS Setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

// Express body-parser
app.use(express.urlencoded({ extended: false }));

// Create the session
app.use(session({
  secret: 'butter_butt',
  resave: true,
  saveUninitialized: true,
}))

// Connect Flash middleware
app.use(flash());

// Global variables
app.use((req,res,next) => {
    // apparently this sets up global variables via middleware and res.locals
    res.locals.success_msg = req.flash('success_msg')
    res.locals_error_msg = req.flash('error_msg')
    next();
})


// Routes 
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

// Set up static folder
app.use(express.static('public'));

// Start/run server
app.listen(PORT, () => {
    console.log(`Server UP & RUNNIN on ${PORT}`)
})