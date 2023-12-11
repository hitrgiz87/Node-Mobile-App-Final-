const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/', async function(req, res, next) {
  try {
    const randomContact = await getRandomContact();
    const remainingTries = 3; // Adjust this value based on your logic

    res.render('contactGuess', {
      title: 'Contact Guess',
      phoneNumber: randomContact.number,
      contactName: randomContact.name,
      remainingTries: remainingTries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to get a random contact
async function getRandomContact() {
  const count = await Contact.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  return Contact.findOne().skip(randomIndex);
}

// Assume you have a function like getRandomContact
router.post('/guess', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const guessedName = req.body.guessInput;

  try {
    const contact = await Contact.findOne({ number: phoneNumber });

    if (!contact) {
      console.log(`Contact not found for phone number ${phoneNumber}`);
      return res.status(404).send('Contact not found');
    }

    if (guessedName.toLowerCase() === contact.name.toLowerCase()) {
      // Correct guess, get a new random contact
      const newContact = await getRandomContact();

      // Send the new contact information as a response
      return res.status(200).json({ result: 'Correct guess!', newPhoneNumber: newContact.number });
    } else {
      // Incorrect guess, send a response indicating incorrect guess
      const remainingTries = 2; // Adjust this value based on your logic
      return res.status(200).json({ result: 'Incorrect guess. Try again.', remainingTries: remainingTries });
    }
  } catch (error) {
    console.error(error);
    console.log(`Error occurred searching for contact with phone number ${phoneNumber}`);
    console.log(`Error: ${error}`);
    return res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
