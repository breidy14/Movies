const express = require('express');
const sessionsController = require('../controllers/sessionsController');

let router = express.Router();

router.route('/signin')
.post(sessionsController.signin,
  sessionsController.generateToken,
  sessionsController.sendToken);
  
router.route('/signup').post(sessionsController.signup);
router.route('/logout').delete(sessionsController.logout);


module.exports = router;