const express = require('express');
const Ticket = require('../models/ticketModel');
const router = express.Router();

/* Helper function */
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

//
//
//
router.get('/', (req, res) => {
  res.json({ text: 'hello world ' });
});

// Getting all
//
//
router.get('/:name', async (req, res) => {
  try {
    const tickets = await Ticket.find({ name: capitalize(req.params.name) });
    console.log('tickets: ', tickets);
    res.json({ tickets: tickets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// creating one
//
//
router.post('/', async (req, res) => {
  try {
    /* First, check if there is already a ticket for today */
    today = new Date();
    today.setHours(0, 0, 0, 0);
    const existingTicket = await Ticket.findOne({
      name: capitalize(req.body.name),
      date: today
    });
    if (existingTicket == null) {
      const ticket = new Ticket({
        name: req.body.name,
        content: req.body.content,
        date: today
      });
      const newTicket = await ticket.save();
      res.status(201).json(newTicket);
    } else {
      existingTicket.content = req.body.content;
      newTicket = await existingTicket.save();
      res.status(201).json(newTicket);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
