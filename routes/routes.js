const express = require('express');
const router = express.Router();
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
  .post((req, res) => {
    if (req.body.username && req.body.password) {
      var username = req.body.username;
      var password = req.body.password;
    }

    const userPromise = userModel.findOne({username: username, password: password}).exec();

    userPromise.then(user => {
      if (!user) {
        res.status(401).json({message: "No such user found"});
      }

      if (user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        const payload = {id: user.id};
        console.log(payload);
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({
          message: "here goes thy token.",
          token: token
        });
      } else {
        res.status(401).json({message: "passwords did not match"});
      }
    });
  });

router.route('/user')
  .get(auth.authenticate(), (req, res) => {
    res.json(userModel[req.user.id]);
  });

router.route('/user/new')
  .post(usersController.createUser);

router.route('/user/:user_id')
  .get(usersController.showProfile);

router.route('/lists')
  .get(listsController.allLists);

router.route('/lists/:list_id')
  .get(listsController.showList);

router.route('/lists/new')
  .post(auth.authenticate(), listsController.createList);

router.route('/lists/:list_id/items/new')
  .post(itemsController.createItem);

router.route('items/:item_id/delete')
  .delete(itemsController.deleteItem);

module.exports = router;
