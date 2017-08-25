const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const listsController = require('../controllers/listsController');
const itemsController = require('../controllers/itemsController');

// Endpoints for this todo application
router.route('/')
  .get((req, res) => {
    res.json("Nothing to see here, this is API mode!")
  });

router.route('/login')
  .get((req, res) => {
    res.json("This is where a user can log in");
  });

router.route('/user')
  .get(usersController.showProfile);

module.exports = router;
