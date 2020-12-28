const express = require('express');
const gendersController = require('../controllers/gendersController');

const router = express.Router();

router.route('/genders')
  .get(gendersController.index)
  .post(gendersController.create);

router.route('/genders/:slug')
  .get(gendersController.find)
  .delete(gendersController.destroy);

module.exports = router;