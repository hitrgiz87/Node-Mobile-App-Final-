var express = require('express');
const Contact = require('../models/contact');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('dailychallenge');
});

router.post('/guess', async (req, res) => {
    try {
        const areaCode = req.body.areaCode;
        alert(areaCode);
    } catch (error) {
        console.error('Error processing area code guess:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;