const express = require('express');
const router = express.Router();
const { registerUser, getUsers} = require('../controller/user-controller');

// Route for user registration
router.post('/', registerUser);
router.get('/', getUsers);

module.exports = router;


