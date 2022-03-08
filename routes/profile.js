
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');


//* Get the authenticated user's profile
router.get('/', profileController.getProfile);


module.exports = router;