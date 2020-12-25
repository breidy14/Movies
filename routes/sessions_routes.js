const express = require('express');
const sessionsController = require('../controllers/sessionsController');

let router = express.Router();

router.route('/sessions')
.post(sessionsController.create,
  sessionsController.generateToken,
  sessionsController.sendToken)
.delete(sessionsController.destroy);


module.exports = router;