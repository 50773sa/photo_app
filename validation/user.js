const { body } = require('express-validator');
const models = require('../models');
 
//* Create Profile validation rules

 const createRules = [
	// Check if email alredy exists
	body('email').exists().isLength({ min: 3 }).custom(async value => {
		const email = await new models.User({ email: value }).fetch({ require: false });
		if (email) {
			return Promise.reject("Email already exists.");
		}
	
		return Promise.resolve();
	}),
	body('email').exists().isLength({ min: 4 }),
	body('password').exists().isLength({ min: 6 }),
	body('first_name').exists().isLength({ min: 3 }),
	body('last_name').exists().isLength({ min: 3 }),
	

    
 ];
 
 module.exports = {
	 createRules,
 }
 