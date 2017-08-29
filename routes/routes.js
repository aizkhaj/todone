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

router.route('/:user_id')
  .get(usersController.showProfile);

router.route('/lists')
  .get(listsController.allLists);

router.route('/lists/:list_id')
  .get(listsController.showList);

router.route('/:list_id/new')
  .get(listsController.newList)
  .post(listsController.createList);

router.route('/:item_id/new')
  .get(itemsController.newItem)
  .post(itemsController.createItem);

router.route('/:item_id/delete')
  .delete(itemsController.deleteItem);

module.exports = router;
