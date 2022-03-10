
// REGISTER USER
// USER_VALIDATION RULES

const { body } = require('express-validator');
const models = require('../models');


//* Create User Registration rules

const createRegistrationRules = [
	// Check if email alredy exists
	body('email').exists().isEmail().trim().isString().custom(async value => {
		const email = await new models.User({ email: value }).fetch({ require: false });
		if (email) {
			return Promise.reject("Email already exists.");
		}
	
		return Promise.resolve();
	}),
	body('password').exists().trim().isLength({ min: 6 }),
	body('first_name').exists().trim().isString({ min: 3 }),
	body('last_name').exists().trim().isString({ min: 3 }),
];


//* Create User validation rules
 
const createRules = [

 	// Check if email alredy exists
	body('user_id').exists().trim().isInt(),
	body('email').exists().isEmail().trim().isString().custom(async value => {
		const email = await new models.User({ email: value }).fetch({ require: false });//require: false = OK to not found email. Otherwise CRASH BAM BOOM!!!
		if (email) {
			return Promise.reject("Email already exists.");
		}
		return Promise.resolve();	
	}),

	body('password').exists().trim().isString({ min: 6 }),
	body('first_name').exists().trim().isString({ min: 3 }),
	body('last_name').exists().trim().isString({ min: 3 }),
];

 module.exports = {
	createRegistrationRules,
	 createRules,	 
};