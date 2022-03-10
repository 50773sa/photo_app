const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/album');

//*  Get authenticated user's albums
router.get('/', albumController.getAlbums);


//* Get a single album
router.get('/:albumId', albumController.getUserAlbum);


//* POST album to authenticated users
router.post('/', albumValidationRules.createRules, albumController.createAlbum);


//* Update an album
router.put('/:albumId', albumValidationRules.updateRules, albumController.updateAlbum);


//* Add photo to an album
router.post('/:albumId/photos', albumValidationRules.addPhotoToAlbumRules, albumController.addPhotoToAlbum);


module.exports = router;



