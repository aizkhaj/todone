const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const userModel = User.model;
const usersController = require('../controllers/usersController');
const listsController = require('../controllers/listsController');
const itemsController = require('../controllers/itemsController');
const jwt = require("jwt-simple");
const passport = require('passport');
const auth = require("../auth.js")();
const config = require('../config.js');

// Endpoints for this todo application
router.route('/')
  .get((req, res) => {
    res.json("Nothing to see here, this is API mode!")
  });

router.route('/login')
  .post(usersController.loginUser);

router.route('/user')
  .get(auth.authenticate(), (req, res) => {
    res.json(userModel[req.user.id]);
  });

router.route('/user/new')
  .post(usersController.createUser);

router.route('/user/:user_id')
  .get(usersController.showProfile);

router.route('/user/:user_id/delete')
  .delete(auth.authenticate(), usersController.deleteUser);

router.route('/lists')
  .get(auth.authenticate(), listsController.allLists);

router.route('/lists/:list_id')
  .get(auth.authenticate(), listsController.showList);

router.route('/lists/new')
  .post(auth.authenticate(), listsController.createList);

router.route('/lists/:list_id/update')
  .put(auth.authenticate(), listsController.updateList);

router.route('/lists/:list_id/delete')
  .delete(auth.authenticate(), listsController.deleteList);

router.route('/lists/:list_id/items')
  .get(auth.authenticate(), itemsController.allItems);

router.route('/lists/:list_id/items/new')
  .post(auth.authenticate(), itemsController.createItem);

router.route('/items/:item_id/update')
  .patch(auth.authenticate(), itemsController.updateItem);


module.exports = router;
