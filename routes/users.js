const express = require('express');
const router = express.Router();
const userValidationRules = require('../validation/user');
const registerController = require('../controllers/register_controller');
const userController = require('../controllers/user_controller');


//* Register a new user
router.post('/register', userValidationRules.createRules, registerController.register);


//* Get the authenticated user
router.get('/', userController.getUser);


module.exports = router;


//!Rör ej






