var express = require('express');
var router = express.Router();
var axios = require('axios');
const Contact = require('../models/contact');


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
    if (contacts.length === 0) {
        res.redirect('/contact-select');
    } else {
        res.render('index');
    }

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