const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();
const auth = require('../middlewares/verifyAuth');
const authModer = require('../middlewares/authenticateAdmin').isModerator;

//const findUser = require('../middlewares/findUser');

//router.route('/').get(moviesController.index);

router.route('/movies')
  .get(moviesController.index)
  .post(auth,authModer,moviesController.create);

router.route('/movies/:slug')
  .get(moviesController.find)
  .delete(auth,authModer,moviesController.destroy);

module.exports = router;