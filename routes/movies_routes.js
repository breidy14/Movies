const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();

router.route('/movies')
  .get(moviesController.index)
  .post(moviesController.create);

router.route('/movies/:slug')
  .get(moviesController.find)
  .delete(moviesController.destroy);

module.exports = router;