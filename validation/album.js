
//ALBUM VALIDATION RULES
//ALBUMS_PHOTOS VALIDATION RULES

const { body } = require('express-validator');
const models = require('../models');
 
 
 //*  Create Album validation rules

const createRules = [
    body('title').exists().isString({ min: 3 }).custom(async value => {
		const title = await new models.Album({ title: value }).fetch({ require: false });
		if (title) {
			return Promise.reject("Title already exists.");
		}
	
		return Promise.resolve();
	}),
];


//* Update Album validation rules

const updateRules = [
    body('title').exists().isString({ min: 3 }).custom(async value => {
		const title = await new models.Album({ title: value }).fetch({ require: false });
		if (title) {
			return Promise.reject("Title already exists.");
		}
	
		return Promise.resolve();
	}),
];



//* POST existing Photo --> Album

const addPhotoToAlbumRules = [
	body('photo_id').exists().isInt()
];


module.exports = {
    createRules,
    updateRules,
	addPhotoToAlbumRules,
};
 