const express = require('express');
const UserController = require('../controllers/usersController');
const auth = require('../middlewares/verifyAuth');
let router = express.Router();

router.route('/users').post(UserController.create);

router.route('/users/:id')
  .patch(UserController.edit)
  .delete(UserController.destroy);

  router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.fullUser)
  })

module.exports = router;