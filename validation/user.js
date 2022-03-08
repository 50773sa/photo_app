
// USER_VALIDATION RULES

 const { body } = require('express-validator');
 const models = require('../models');
 
 
 //* Create User validation rules
 
 const createRules = [

 // Check if email alredy exists
	body('user_id').exists().isInt({ min: 1 }),
	body('email').exists().isLength({ min: 4 }).custom(async value => {
		const email = await new models.User({ email: value }).fetch({ require: false });//require: false = OK to not found email. Otherwise CRASH BAM BOOM!!!
		if (email) {
			return Promise.reject("Email already exists.");
		}
		return Promise.resolve();	
	}),

	body('password').exists().isLength({ min: 6 }),
	body('first_name').exists().isLength({ min: 3 }),
	body('last_name').exists().isLength({ min: 3 }),
];

 module.exports = {
	 createRules,	 
 };