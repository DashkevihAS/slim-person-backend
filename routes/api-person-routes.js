const express = require('express');
const router = express.Router();

const {
  getAllPersons,
  createPerson,
  updatePerson,
} = require('../controllers/PersonController');

// GET all Persons
router.get('/persons', getAllPersons);

//add new person
router.post('/persons', createPerson);

//update person data
router.patch('/persons', updatePerson);

module.exports = router;
