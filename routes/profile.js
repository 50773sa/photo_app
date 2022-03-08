
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/album');

//* Get the authenticated user's profile
router.get('/', profileController.getProfile);


//*  Get authenticated user's albums
router.get('/albums', profileController.getAlbums);

router.post('/albums', albumValidationRules.createRules, profileController.addAlbum);

//* Get authenticated user's photos
router.get('/photos', profileController.getPhotos);

module.exports = router;