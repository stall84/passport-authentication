const express = require('express');
const router = express.Router();


// Login Page
router.get('/login', (req,res,next) => {
    res.send('Login')
})

// Register Page
router.get('/register', (req,res,next) => {
    res.send('Register Here')
})


module.exports = router;