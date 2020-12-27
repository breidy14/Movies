const express = require('express');
const UserController = require('../controllers/usersController');

let router = express.Router();

router.route('/users').post(UserController.create);

module.exports = router;