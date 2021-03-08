const express = require('express');
const rolesController = require('../controllers/rolesController');
const auth = require('../middlewares/verifyAuth');
const authAdmin = require('../middlewares/authenticateAdmin').isAdmin;



const router = express.Router();

router.route('/role')
  .get(auth,authAdmin,rolesController.index)
  .post(auth,authAdmin,rolesController.create);

router.route('/role/:slug')
  .get(auth,authAdmin,rolesController.find)
  .delete(auth,authAdmin,rolesController.destroy);

module.exports = router;