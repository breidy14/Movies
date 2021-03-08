const express = require('express');
const gendersController = require('../controllers/gendersController');
const auth = require('../middlewares/verifyAuth');
const authModer = require('../middlewares/authenticateAdmin').isModerator;
const router = express.Router();

router.route('/genders')
  .get(gendersController.index)
  .post(auth,authModer,gendersController.create);

router.route('/genders/:slug')
  .get(gendersController.find)
  .delete(auth,authModer,gendersController.destroy);

module.exports = router;