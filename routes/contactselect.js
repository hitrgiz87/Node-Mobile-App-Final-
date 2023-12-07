var express = require('express');
var router = express.Router();
var axios = require('axios');
const Contact = require('../models/contact');

router.get('/', async function(req, res, next) {
    let userData = await axios.get('https://jsonplaceholder.typicode.com/users');
    let phones = processPhoneNumbers(userData.data);
    let profilePics = generateProfilePictures(userData.data);
    
    // console.log(profilePics);
    // console.log(phones);

    res.render('contactselect', {userData: userData.data, phones: phones, profilePic: profilePics});
});

/**
 * Generate default profile pictures with initials from user data from jsonPlaceholder
 * @param {*} userData, Assume userData is from jsonPlaceholder
 */
function generateProfilePictures(userData) {
    var profilePics = [];

    for (let i=0; i < userData.length; i++) {
        let name = userData[i].name;

        // Split the full name into an array using space as the separator
        let nameArray = name.split(" ");

        // Extract the first name (index 0) and last name (index 1)
        let firstName = nameArray[0];
        let lastName = nameArray.slice(1).join(" "); // Join the remaining parts as the last name
        
        profilePics[i] = "https://ui-avatars.com/api/?name=" + firstName + "+" + lastName;
    }
    return profilePics;
}

/**
 * Process phone numbers from jsonPlaceholder to be standardized
 * @param {*} userData Assume userData is from jsonPlaceholder
 */
function processPhoneNumbers(userData) {
    var phoneNumbers = [];
    for (let i=0; i < userData.length; i++) {
        let phone = userData[i].phone;

        // Theres most likely a way to not have if statements here but I don't care
        if (phone.substring(0, 1) === "(") {
            phone = phone.substring(1).replaceAll(")", "-");
        }
        if (phone.substring(0, 2) === "1-") {
            phone = phone.substring(2);
        }

        phone = phone.replaceAll(".", '-');        
        phone = phone.substring(0, 12);        

        phoneNumbers[i] = phone;
    }
    return phoneNumbers;
}

module.exports = router;