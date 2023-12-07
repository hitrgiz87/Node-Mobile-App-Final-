var express = require('express');
const Contact = require('../models/contact');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('dailychallenge');
});

router.post('/guess', async (req, res) => {
    try {
        const areaCode = req.body.areaCode;
        console.log('Received area code:', areaCode);
        res.send(areaCode);
    } catch (error) {
        console.error('Error processing guess:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;