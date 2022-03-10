
// PHOTO VALIDATION RULES

const { body } = require('express-validator');
const models = require('../models');
 
 
//* Create Photo validation rules

const createRules = [
	 body('title').exists().isString({ min: 3 }),
	 body('url').exists().isURL().isString(),
	 body('comment').optional().isString({ min: 3 }),
];
 
 
//* Update Photo validation rules
 
const updateRules = [
    body('title').exists().isString({ min: 3 }),
    body('url').exists().isURL().isString(),
    body('comment').optional().isString({ min: 3 }),
	body('album_id').optional().custom(async value => {
		const album = await new models.Album({ id: value }).fetch({ require: false });
		if (!album) {
			return Promise.reject('Album don\'t exist.');
		}
 
		return Promise.resolve();
	}),
];
 
module.exports = {
    createRules,
	updateRules,
};