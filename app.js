const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

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


app.listen(PORT, () => {
    console.log(`Server UP & RUNNIN on ${PORT}`)
})

// Routes 
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

// Set up static folder
app.use(express.static('public'));
