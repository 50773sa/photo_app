const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const profileController = require('../controllers/profile_controller');
const albumValidationRules = require('../validation/album');


//* Get all albums (no need fo authentication)
router.get('/', albumController.index);


//* Get a single album
router.get('/:albumId', albumController.show);


//* Create a new album
router.post('/albums', albumValidationRules.createRules, profileController.addAlbum);


//* Update an album
router.put('/:albumId', albumValidationRules.updateRules, albumController.update);


//* Add photo to an album
//router.post('/:albumId/photos', albumValidationRules.createRules, albumController.update);


module.exports = router;



