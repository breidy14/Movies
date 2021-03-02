const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();
const auth = require('../middlewares/verifyAuth');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

//const findUser = require('../middlewares/findUser');

//router.route('/').get(moviesController.index);

router.route('/movies')
  .get(moviesController.index)
  .post(auth,authenticateAdmin,moviesController.create);

router.route('/movies/:slug')
  .get(auth,authenticateAdmin,moviesController.find)
  .delete(auth,authenticateAdmin,moviesController.destroy);

module.exports = router;