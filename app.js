const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const PORT = process.env.PORT || 5000;

// EJS Setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');


app.listen(PORT, () => {
    console.log(`Server UP & RUNNIN on ${PORT}`)
})

// Routes 
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

