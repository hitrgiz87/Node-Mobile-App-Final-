var express = require('express');
const Contact = require('../models/contact');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    let contacts = await Contact.find();

    // var humphrey = new Contact({
    //     name:"humphrey",
    //     number:"2538780951",
    // });

    // try {
    //     await humphrey.save();
    // } catch (e) {
    //     res.render('servererror', e);
    // }

    // If the database is empty run through initial contact selection
    if (contacts.length == 0 && false) { // Effectively disable this for now - Phil
        res.redirect('/contact-select');
    } else {
        res.render('index');
    }

});

router.get('/contact-select', function(req, res, next) {
    res.render('contactselect');
});

// TODO: Add navigation with other pages once they are co
router.get('/contact-guess', function(req, res, next) {
    // res.render();
}); 
// TODO: Add navigation with other pages once they are co
router.get('/daily-challenge', function(req, res, next) {
    // res.render();
}); 

router.get('/test', async function(req, res, next) {
    let contacts = await Contact.find();

    res.render('test', {contacts: contacts});
});

module.exports = router;