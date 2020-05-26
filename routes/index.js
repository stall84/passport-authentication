const express = require('express');
const router = express.Router();



router.get('/', (req,res,next) => {
    res.render('welcome')
})

router.get('/dashboard', (req,res,next) => {
    res.render('dashboard', {
        user: {
            name: 'Michael Badassmon'
        }
    })
})


module.exports = router;