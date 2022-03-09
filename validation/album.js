
 //Album Validation Rules


//! OK för albums. 


const { body } = require('express-validator');
const { header } = require('express/lib/request');
const models = require('../models');
 
 
 //*  Create Album validation rules

const createRules = [
    body('title').exists().isLength({ min: 3 }).custom(async value => {
		const title = await new models.Album({ title: value }).fetch({ require: false });
		if (title) {
			return Promise.reject("Title already exists.");
		}
	
		return Promise.resolve();
	}),
];

// const createRules = [
// 	body('title').exists().isLength({ min: 3 }),
// 	body('url').exists().isURL().isLength({ min: 1 }),
// 	body('comment').optional().isLength({ min: 1 }),
// 	body('user_id').exists().isInt({ min: 1 }),
// 	body('album_id').exists().bail().custom(async value => {
// 		const album = await new models.Album({ id: value }).fetch({ require: false });
// 		if (!album) {
// 			return Promise.reject(`Album with ID ${value} does not exist.`);
// 		}

// 		return Promise.resolve();
// 	}),
// ];


//* Update Album validation rules

const updateRules = [
    body('title').optional().isLength({ min: 3 })
];

module.exports = {
    createRules,
    updateRules,
};
 