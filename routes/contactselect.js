var express = require('express');
var router = express.Router();
var axios = require('axios');
const Contact = require('../models/contact');

router.get('/', async function(req, res, next) {
    let userData = await axios.get('https://jsonplaceholder.typicode.com/users');
    let profilePic = [];

    for (let i=0; i < userData.data.length; i++) {
        // Split the full name into an array using space as the separator
        var nameArray = userData.data[i].name.split(" ");

        // Extract the first name (index 0) and last name (index 1)
        var firstName = nameArray[0];
        var lastName = nameArray.slice(1).join(" "); // Join the remaining parts as the last name
        
        profilePic[i] = "https://ui-avatars.com/api/?name=" + firstName + "+" + lastName;
    }
    
    console.log(profilePic);

    res.render('contactselect', {userData: userData.data, profilePic: profilePic});
});

module.exports = router;