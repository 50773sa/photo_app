
// REGISTER CONTROLLER

const bcrypt = require('bcrypt');
const debug = require('debug')('photo_app:register_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');
 

//* POST- Register a new user 
 
const register = async (req, res) => { 

	// Validation errors?
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	};
 
	// Get ONLY the validated data from the request
	const validData = matchedData(req);

  
	// Generate a hash password of validData.password 
	// and overwrite the existing validData.password
	try {
		validData.password = await bcrypt.hash(validData.password, 10);
 
	} 	catch (error) {
		res.status(500).send({
			status: 'error',
		 	message: 'Exception thrown when hashing the password.',
		});

		throw error;
	};
 
	try {
		const user = await new models.User(validData).save();
		debug("Created new user successfully: %O", user);
 
		res.send({
			status: 'success',
			data: {
				user,
			},
		})
 
	} 	catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		});

		throw error;
	};
};
 
module.exports = {
	register,
};