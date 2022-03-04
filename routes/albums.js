const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/album');

//Get all albums
router.get('/', albumController.index);

// Get a single album
router.get('/:albumId', albumController.show);

// Create a new album
router.post('/', albumValidationRules.createRules, albumController.store);

// Update an album
router.put('/:albumId', albumValidationRules.updateRules, albumController.update);

// Add photo to an album
router.post('/:albumId/photos', albumValidationRules.updateRules, albumController.update);


module.exports = router;