const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const registerController = require('../controllers/register_controller');
const userValidationRules = require('../validation/user');//plockar in data från mappen validation

/* Get all resources */
router.get('/', userController.index);

/* Get a specific resource */
router.get('/:userId', userController.show);

// registera ny använare
router.post('/', userValidationRules.createRules, registerController.register);

// /* Update a specific resource */
// router.put('/:userId', userValidationRules.updateRules, userController.update);

// /* Destroy a specific resource */
// router.delete('/:userId', userController.destroy);

module.exports = router;






