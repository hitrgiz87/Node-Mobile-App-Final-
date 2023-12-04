var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

// TODO: Add navigation with other pages once they are co
router.get('/contact-guess', function(req, res, next) {
    // res.render();
}); 
// TODO: Add navigation with other pages once they are co
router.get('/daily-challenge', function(req, res, next) {
    // res.render();
}); 

module.exports = router;