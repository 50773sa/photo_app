
/* PROFILE_CONTROLLER */


const bcrypt = require('bcrypt');
const debug = require('debug')('photo_app:profile_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

 

//*  GET authenticated user's profile

const getUser = async (req, res) => {
	
	res.send({
		status: 'success',
		data: {
			user: req.user,	 
		}
	});
};
 


 
module.exports = {
	getUser,
};