/**
 * Profile Controller
 */

 const bcrypt = require('bcrypt');
 const debug = require('debug')('photo_app:profile_controller');
 const { matchedData, validationResult } = require('express-validator');
 
 /**
  * Get authenticated user's profile
  *
  * GET /
  */
 const getProfile = async (req, res) => {
	 res.send({
		 status: 'success',
		 data: {
			 user: req.user,
		 }
	 });
 }
 
 /**
  * Update authenticated user's profile
  *
  * PUT /
  */
 const updateProfile = async (req, res) => {
	 // check for any validation errors
	 const errors = validationResult(req);
	 if (!errors.isEmpty()) {
		 return res.status(422).send({ status: 'fail', data: errors.array() });
	 }
 
	 // get only the validated data from the request
	 const validData = matchedData(req);
 
	 // update the user's password, but only if they sent us a new password
	 if (validData.password) {
		 try {
			 validData.password = await bcrypt.hash(validData.password, 10);
 
		 } catch (error) {
			 res.status(500).send({
				 status: 'error',
				 message: 'Exception thrown when hashing the password.',
			 });
			 throw error;
		 }
	 }
 
	 try {
		 const updatedUser = await req.user.save(validData);
		 debug("Updated user successfully: %O", updatedUser);
 
		 res.send({
			 status: 'success',
			 data: {
				 user: updatedUser,
			 },
		 });
 
	 } catch (error) {
		 res.status(500).send({
			 status: 'error',
			 message: 'Exception thrown in database when updating a new user.',
		 });
		 throw error;
	 }
 }
 
 /**
  * Get authenticated user's albums
  *
  * GET /albums
  */
 const getAlbums = async (req, res) => {
	 // get user and also eager-load the albums-relation
	 // const user = await new models.User({ id: req.user.id })
	 // 	.fetch({ withRelated: ['albums'] });
 
	 // "lazy load" the albums-relation
	 await req.user.load('albums');
 
	 res.status(200).send({
		 status: 'success',
		 data: {
			 albums: req.user.related('albums'),
		 },
	 });
 }
 
 /**
  * Add a book to the authenticated user
  *
  * @todo 1. Validate that the book actually exists
  * @todo 2. Validate that the book they are trying to add isn't already in the list
  *
  * POST /albums
  * {
  *   album_id: 5
  * }
  */
 const addAlbum = async (req, res) => {
	 // check for any validation errors
	 const errors = validationResult(req);
	 if (!errors.isEmpty()) {
		 return res.status(422).send({ status: 'fail', data: errors.array() });
	 }
 
	 // get only the validated data from the request
	 const validData = matchedData(req);
 
	 // lazy-load book relationship
	 await req.user.load('albums');
 
	 // get the user's albums
	 const albums = req.user.related('albums');
 
	 // check if book is already in the user's list of albums
	 const existing_album = albums.find(book => book.id == validData.album_id);
 
	 // if it already exists, bail
	 if (existing_album) {
		 return res.send({
			 status: 'fail',
			 data: 'Album already exists.',
		 });
	 }
 
	 try {
		 const result = await req.user.albums().attach(validData.album_id);
		 debug("Added book to user successfully: %O", result);
 
		 res.send({
			 status: 'success',
			 data: null,
		 });
 
	 } catch (error) {
		 res.status(500).send({
			 status: 'error',
			 message: 'Exception thrown in database when adding a book to a user.',
		 });
		 throw error;
	 }
 }

 /**
  * Get authenticated user's albums
  *
  * GET /photos
  */
  const getPhotos = async (req, res) => {
	// get user and also eager-load the photo-relation
	// const user = await new models.User({ id: req.user.id })
	// 	.fetch({ withRelated: ['photos'] });

	// "lazy load" the photo-relation
	await req.user.load('photos');

	res.status(200).send({
		status: 'success',
		data: {
			photos: req.user.related('photos'),
		},
	});
}

// Add photo to authenticated user

const addPhoto = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// lazy-load photos relationship
	await req.user.load('photos');

	// get the user's photos
	const photos = req.user.related('photos');

	// check if book is already in the user's list of albums
	const existing_photo = photos.find(photo => photo.id == validData.photo_id);

	// if it already exists, bail
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
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a photo to a user.',
		});
		throw error;
	}
}
 
 module.exports = {
	 getProfile,
	 updateProfile,
	 getAlbums,
	 addAlbum,
	 getPhotos,
	 addPhoto,
 }