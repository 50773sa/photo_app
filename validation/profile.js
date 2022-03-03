/**
 * Profile Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');



 //* Create User validation rules

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
 /**
  * Update Profile validation rules
  *
  * Required: -
  * Optional: password, first_name, last_name
  */
 const updateRules = [
	 body('password').optional().isLength({ min: 4 }),
	 body('first_name').optional().isLength({ min: 2 }),
	 body('last_name').optional().isLength({ min: 2 }),
 ];
 
 /**
  * Add album to profile validation rules
  *
  * Required: album_id
  * Optional: -
  */
 const addAlbumRules = [
	 body('album_id').exists().bail().custom(async value => {
		 const album = await new models.Album({ id: value }).fetch({ require: false });
		 if (!album) {
			 return Promise.reject(`Album with ID ${value} does not exist.`);
		 }
 
		 return Promise.resolve();
	 }),
 ];

 const addPhotoRules = [
	body('photo_id').exists().bail().custom(async value => {
		const photo = await new models.Photo({ id: value }).fetch({ require: false });
		if (!photo) {
			return Promise.reject(`Photo with ID ${value} does not exist.`);
		}

		return Promise.resolve();
	}),
];
 
 module.exports = {
	 createRules,
	 updateRules,
	 addAlbumRules,
	 addPhotoRules,
	
 }