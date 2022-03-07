
 //Album Validation Rules


//! OK för albums. 


const { body } = require('express-validator');
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


//* Update Album validation rules

const updateRules = [
    body('title').optional().isLength({ min: 3 }),
];

 
module.exports = {
    createRules,
    updateRules,
};
 