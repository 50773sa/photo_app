
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation/profile');

//* Get the authenticated user's profile
router.get('/', profileController.getProfile);


//*  Get authenticated user's albums
router.get('/albums', profileController.getAlbums);


//* Add a new album to the authenticated user
router.post('/albums', profileValidationRules.addAlbumRules, profileController.addAlbum);


//* Get authenticated user's photos
router.get('/photos', profileController.getPhotos);


//* Add a new photo to authenticated user'
router.post('/photos', profileValidationRules.addPhotoRules, profileController.addPhoto);

module.exports = router;
