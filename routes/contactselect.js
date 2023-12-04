var express = require('express');
const Contact = require('../models/contact');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('contactselect');
});

module.exports = router;