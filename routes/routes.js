const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const userModel = User.model;
const usersController = require('../controllers/usersController');
const listsController = require('../controllers/listsController');
const itemsController = require('../controllers/itemsController');
const jwt = require("jwt-simple");
const auth = require("../auth.js")();
const cfg = require('../config.js');

// Endpoints for this todo application
router.route('/')
  .get((req, res) => {
    res.json("Nothing to see here, this is API mode!")
  });

router.route('/login')
  .post((req, res) => {
    if (req.body.username && req.body.password) {
      const username = req.body.username;
      const password = req.body.password;
      const user = userModel.find(u => {
        return u.username === username && u.password === password;
      });
      if (user) {
        const payload = {
          id: user.id
        }
        const token = jwt.encode(payload, cfg.jwtSecret);
        res.json({
          token: token
        });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });

router.route('/:user_id')
  .get(usersController.showProfile);

router.route('/user')
  .get(auth.authenticate(), (req, res) => {
    res.json(userModel[req.user.id]);
  });

router.route('/lists')
  .get(listsController.allLists);

router.route('/lists/:list_id')
  .get(listsController.showList);

router.route('/lists/new')
  .get(listsController.newList)
  .post(listsController.createList);

router.route('/lists/:list_id/items/new')
  .get(itemsController.newItem)
  .post(itemsController.createItem);

router.route('items/:item_id/delete')
  .delete(itemsController.deleteItem);

module.exports = router;
