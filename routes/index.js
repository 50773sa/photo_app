const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const registerController = require('../controllers/register_controller');
const userValidationRules = require('../validation/user');


// GET
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'Nothing here to see. You need to log in' }});
});


// Auth.basic = middleware. Runs with everything that runs with users
router.use('/users', auth.basic, require('./users'));
router.use('/albums', auth.basic, require('./albums'));
router.use('/photos', auth.basic, require('./photos'));


// Register a new user
router.post('/register', userValidationRules.createRegistrationRules, registerController.register);

module.exports = router;