const mongoose = require('mongoose');

// TODO: Add hints but I dont know how to use arrays correctly yet
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
});

const Contact = mongoose.model('contacts', contactSchema);

module.exports = Contact;