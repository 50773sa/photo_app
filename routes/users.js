const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

//* Get the authenticated user
router.get('/', userController.getUser);


module.exports = router;









