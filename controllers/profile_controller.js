
/* PROFILE_CONTROLLER */


const bcrypt = require('bcrypt');
const debug = require('debug')('photo_app:profile_controller');
const { matchedData, validationResult } = require('express-validator');
 

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

 
//* Add a new album to the authenticated user

const addAlbum = async (req, res) => {

	// Validation ERROR?
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}
 
	// Get only the validated data from the add-album request
	const validData = matchedData(req);
 
	// Load album relationship
	await req.user.load('albums');
 
	// Get user's albums
	const albums = req.user.related('albums');
 
	// Check if album already exists...
	const existing_album = albums.find(album => album.id == validData.album_id);
 
	// If album exist...
	if (existing_album) {
		return res.send({
			status: 'fail',
			data: 'Album already exists',
		});
	};
 
	// Attach album to user
	try {
		const result = await req.user.albums().attach(validData.album_id);
		debug("Added album to user successfully: %O", result);
 
		res.send({
			status: 'success',
			data: result, //! ?????????????
		});
 
	// Catch error if it fails
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Cannot add album to user. Error has occurred during connection to the server.',
		});
		throw error;
	};
};

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

//* Add a new photo to authenticated user'

const addPhoto = async (req, res) => {

	// If validation ERROR?
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	const validData = matchedData(req);

	await req.user.load('photos');

	const photos = req.user.related('photos');

	const existing_photo = photos.find(photo => photo.id == validData.photo_id);

	if (existing_photo) {
		return res.send({
			status: 'fail',
			data: 'Photo already exists.',
		});
	}

	try {
		const result = await req.user.photos().attach(validData.photo_id);
		debug("Added photo to user successfully: %O", result);

		res.send({
			status: 'success',
			data: result,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Cannot add photo to user. Error has occurred during connection to the server',
		});
		throw error;
	};
};
 
module.exports = {
	getProfile,
	getAlbums,
	addAlbum,
	getPhotos,
	addPhoto,
};