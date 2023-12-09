const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/', async function(req, res, next) {
  try {
    const randomContact = await getRandomContact();
    res.render('contactGuess', { title: 'Contact Guess', phoneNumber: randomContact.number, contactName: randomContact.name });
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

router.post('/guess', async (req, res) => {

  console.log(`Guess received: ${req.body.guessInput}`);

  const phoneNumber = req.body.phoneNumber;
  const guessedName = req.body.guessInput;



  try {
    const contact = await Contact.findOne({ number: phoneNumber });
    

    if (!contact) {
      console.log(`Contact not found for phone number ${phoneNumber}`);
      return res.status(404).send('Contact not found');
    }

    if (guessedName.toLowerCase() === contact.name.toLowerCase()) {
      // return res.send('Congratulations! Your guess is correct.');
      res.redirect('/contactGuess');

    } else {
      return res.send('Incorrect guess. Try again.');
    }
  } catch (error) {
    console.error(error);
    
    console.log(`Error occurred searching for contact with phone number ${phoneNumber}`);
    console.log(`Error: ${error}`);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;