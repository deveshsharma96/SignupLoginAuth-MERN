const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();



router.get('/', ensureAuthenticated, (req, res) => {
    console.log('--------Logged in user detail------', req.user);
    res.status(200).json([
        { 
            name: "Weather & AQI", 
            price: 1
        },
         { 
            name: "Currency Exchange ", 
            price: 1
        }
    ])
});

module.exports = router;