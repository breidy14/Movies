const express = require('express');
const userController = require('../controllers/usersController');
const auth = require('../middlewares/verifyAuth');
let router = express.Router();

router.route('/users').post(userController.create);

router.route('/users/:id')
  .patch(userController.edit)
  .delete(userController.destroy);

  router.get('/users/me', auth, userController.find);

module.exports = router;