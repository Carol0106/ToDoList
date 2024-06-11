
const router = require('express').Router();
const Contact = require('../Models/Contact'); 

// POST add a new contact
router.post('/contacts', async (req, res) => {
    try {
        const { name, email, telephone, message } = req.body;
        const newContact = new Contact({ name, email, telephone, message });
        await newContact.save();
        res.status(201).json({ success: true, message: 'Contact added successfully' });
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).json({ success: false, message: 'Failed to add contact' });
    }
});

module.exports = router;