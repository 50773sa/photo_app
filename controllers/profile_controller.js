
/* PROFILE_CONTROLLER */


const bcrypt = require('bcrypt');
const debug = require('debug')('photo_app:profile_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

 

//*  Get authenticated user's profile

const getProfile = async (req, res) => {
	
	res.send({
		status: 'success',
		data: {
			user: req.user,	 
		}
	});
};
 

//*  Get authenticated user's albums

const getAlbums = async (req, res) => {
	
	// "Called lazy load" = fetch the the albums-relation
	await req.user.load('albums');
 
	res.status(200).send({
		status: 'success',
		data: {
			albums: req.user.related('albums'),
		},
	});
};



const addAlbum = async (req, res) => {

	// check for any validation errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);
	validData.user_id = req.user.get('id')

	
	try {
		const album = await new models.Album(validData).save();
		debug("Added album to user successfully: %O", album);

		res.send({
			status: 'success',
			data: album
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a album to a user.',
		});
		throw error;
	}
}


 //* Get authenticated user's photos

const getPhotos = async (req, res) => {

	// Load photo relationship
	await req.user.load('photos');

	res.status(200).send({
		status: 'success',
		data: {
			photos: req.user.related('photos'),
		},
	});
};
 
module.exports = {

	getProfile,
	getAlbums,
	addAlbum,
	getPhotos,
};