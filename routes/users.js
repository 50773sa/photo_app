const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register_controller');
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');

//! Get all users
router.get('/', userController.index);

//! Get a single user
router.get('/:userId', userController.show);

//! Update a specific user
router.put('/:userId', userValidationRules.updateRules, userController.update);

//* Register a new user
router.post('/register', userValidationRules.createRules, registerController.register);


module.exports = router;






