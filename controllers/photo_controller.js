
// PHOTO CONTROLLER

const debug = require('debug')('photo_app:album_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');



//*  GET authenticated user's photos

const getPhotos = async (req, res) => {
   
   // "Called lazy load" = fetch the the photos-relation
   await req.user.load('photos') 

   res.status(200).send({
       status: 'success',
       data: {
           photos: req.user.related('photos'),
       },
   });
};


//* GET a specific photo (/:photoId)

const getUserPhoto = async (req, res) => {

    const user = await new models.User({ id: req.user.id })
        .fetch({ withRelated: ['photos'] });

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    };

    // Get ONLY the validated data from the request
    const validData = matchedData(req);

    // Check if photo users photo exists
    const photo = user.related('photos').find(photo => photo.id == req.params.photoId);


    try {
        const getPhoto = await photo.get(validData);
        debug("Updated photo successfully: %O", getPhoto);

        return res.send({
            status: 'success',
            data: {
                photo: photo
            },
        });

    }   catch (error) {
        return res.status(404).send({
                status: 'error',
                message: 'Photo Not Found.',
        });
    };
};


//*  POST authenticated user's photos

const addPhoto = async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    };

    // Get ONLY the validated data from the request
    const validData = matchedData(req);
    validData.user_id = req.user.get('id')

    
    try {
        const photo = await new models.Photo(validData).save();
        debug("Added photo to user successfully: %O", photo);

        res.send({
            status: 'success',
            data: photo
        });

    }   catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when adding a photo to a user.',
        });
    };
};


//* PUT- Update aspecific photo (/:photoId)

const updatePhoto = async (req, res) => {
    const photoId = req.params.photoId;

    // Photo exists?
    const photo = await new models.Photo({ id: photoId }).fetch({ require: false });
    if (!photo) {
        debug("photo to update was not found. %o", { id: photoId });
        res.status(404).send({
            status: 'fail',
            data: 'Photo Not Found',
        });
        return;
    }

    // Validation errors?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // Get ONLY the validated data from the request
    const validData = matchedData(req);

    try {
        const updatedPhoto = await photo.save(validData);
        debug("Updated photo successfully: %O", updatedPhoto);

        res.send({
            status: 'success',
            data: {
                photo,
            },
        });

    }   catch (error) {
        return res.status(500).send({
           status: 'error',
           message: 'Exception thrown in database when updating a photo.',
        });
    };
};


module.exports = {
   getPhotos,
   getUserPhoto,
   addPhoto,
   updatePhoto,
};
