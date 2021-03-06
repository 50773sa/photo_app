const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation/photo');


//* Get authenticated user's photos
router.get('/', photoController.getPhotos);

//* Get a single photo
router.get('/:photoId', photoController.getUserPhoto);


//* Create a new photo
router.post('/', photoValidationRules.createRules, photoController.addPhoto);


//* Update a photo
router.put('/:photoId', photoValidationRules.updateRules, photoController.updatePhoto);


module.exports = router;