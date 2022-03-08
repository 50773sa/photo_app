const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register_controller');
const profileValidationRules = require('../validation/profile');

//* Register a new user
router.post('/register', profileValidationRules.createRules, registerController.register);


module.exports = router;


//!Rör ej






