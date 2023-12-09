var express = require('express');
var router = express.Router();
var axios = require('axios');
const Contact = require('../models/contact');

router.get('/', async function(req, res, next) {
    let userData = await axios.get('https://jsonplaceholder.typicode.com/users');
    let phones = standardizePhoneNumbers(userData.data);
    let profilePics = generateProfilePictures(userData.data);
    
    // console.log(profilePics);
    // console.log(phones);

    res.render('contactselect', {userData: userData.data, phones: phones, profilePic: profilePics});
});

router.post('/submit', async function(req, res, next) {
    let selectedContacts = parseSelectedContactsString(req.body.selectedContacts);

    // console.log(selectedContacts);

    try {
        for (let i=0; i < selectedContacts.length; i++) {
            // contactArr[0] is name and contactArr[1] is phone num
            let contactArr = selectedContacts[i].split(", ");
        
            const contact = new Contact({
                name: contactArr[0],
                number: contactArr[1],
            });

            // Doesnt work if I just pass in contact ????
            // The contacts stay after theyre deleted ?????
            // if (Contact.exists({
            //     name: contactArr[0],
            //     number: contactArr[1],
            // }) !== null) {
            //     console.log('Contact already exists');
            //     continue;
            // }

            await contact.save();
        }
        res.redirect("/");
    } catch (e) {
        // TODO: Proper error handling
        res.render('error');
    }    
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
function standardizePhoneNumbers(userData) {
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

        phone = phone.replaceAll(".", '');   
        phone = phone.replaceAll("-", '');             
        phone = phone.substring(0, 10);        

        phoneNumbers[i] = phone;
    }
    return phoneNumbers;
}

/**
 * 
 * @param {*} selectedContacts Selected contacts string formatted like 
 * [Contact 1 Name, Contact 1 Num][Contact 2 Name, Contact 2 Num]....
 * @returns 
 */
function parseSelectedContactsString(selectedContacts) {
    contactsArr = selectedContacts.replaceAll("[", "").split("]");
    contactsArr.pop(); // Remove last element because it is empty and useless 
    return contactsArr; 
}

module.exports = router;