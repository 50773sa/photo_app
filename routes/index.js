const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const registerController = require('../controllers/register_controller');
const userValidationRules = require('../validation/user');

// GET
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'Yep, all good! 👍' }});
});

router.use('/profile', require('./profile'));//auth.basic, lägg middleware här för att den ska köras på alla som börjar med users
router.use('/albums', require('./albums'));
router.use('/photos',  require('./photos'));


// register a new user
router.post('/register', userValidationRules.createRules, registerController.register);



module.exports = router;