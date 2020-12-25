const express = require('express');
const UserController = require('../controllers/UserController');

let router = express.Router();

router.route('/users').post(UserController.create);

module.exports = router;