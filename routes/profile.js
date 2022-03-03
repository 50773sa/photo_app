//! OK. Men kanske addera get, put och post photos?

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation/profile');

/**
 * Get authenticated user's profile
 */
router.get('/', profileController.getProfile);

/**
 * Update authenticated user's profile
 */
router.put('/', profileValidationRules.updateRules, profileController.updateProfile);

/**
 * Get authenticated user's albums
 */
router.get('/albums', profileController.getAlbums);

/**
 * Add a book to the authenticated user
 *
 */
router.post('/albums', profileValidationRules.addAlbumRules, profileController.addAlbum);



router.get('/photos', profileController.getPhotos);

/**
 * Add a photo to the authenticated user
 *
 */
router.post('/photos', profileValidationRules.addPhotoRules, profileController.addPhoto);

module.exports = router;
