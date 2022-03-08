
// PHOTO VALIDATION RULES

 const { body } = require('express-validator');
 const models = require('../models');
 
 
//* Create Photo validation rules

 const createRules = [
	 body('title').exists().isLength({ min: 3 }),
	 body('url').exists().isURL().isLength({ min: 1 }),
	 body('comment').optional().isLength({ min: 1 }),
	 body('user_id').exists().isInt({ min: 1 }),
	 body('album_id').exists().bail().custom(async value => {
		 const album = await new models.Album({ id: value }).fetch({ require: false });
		 if (!album) {
			 return Promise.reject(`Album with ID ${value} does not exist.`);
		 }
 
		 return Promise.resolve();
	 }),
 ];
 
 
  //Update Photo validation rules
 
 const updateRules = [
    body('title').exists().isLength({ min: 3 }),
    body('url').exists().isURL({ min: 1 }),
    body('comment').optional().isLength({ min: 1 }),
	body('album_id').optional().custom(async value => {
		 const album = await new models.Album({ id: value }).fetch({ require: false });
		 if (!album) {
			 return Promise.reject(`Album with ID ${value} does not exist.`);
		 }
 
		 return Promise.resolve();
	 }),
 ];
 
 module.exports = {
	 createRules,
	 updateRules,
 }