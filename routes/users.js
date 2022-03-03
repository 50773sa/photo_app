
//!OK


const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');//plockar in data från mappen validation

/* Get all resources */
router.get('/', userController.index);

/* Get a specific resource */
router.get('/:userId', userController.show);

// /* Update a specific resource */
router.put('/:userId', userValidationRules.updateRules, userController.update);


module.exports = router;






