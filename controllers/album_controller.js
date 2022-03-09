
// ALBUM CONTROLLER

 const debug = require('debug')('photo_app:album_controller');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');

 

//*  GET authenticated user's albums

const getAlbums = async (req, res) => {
	
	// "Called lazy load" = fetch the the albums-relation
	await req.user.load('albums') 
 
	res.status(200).send({
		status: 'success',
		data: {
			albums: req.user.related('albums'),
		},
	});
};


//* GET a specific album (/:albumId)

const getUserAlbum = async (req, res) => {

	const user = await new models.User({ id: req.user.id })
	  	.fetch({ withRelated: ['albums'] });
 
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    };
 
    // Get ONLY the validated data from the request
    const validData = matchedData(req);

    // Check if album users album exists
    const album = user.related('albums').find(album => album.id == req.params.albumId);


    try {
        const getAlbum = await album.get(validData);
        debug("Updated album successfully: %O", getAlbum);
 
        res.send({
            status: 'success',
            data: {
                album: album
            },
        });
 
    }   catch (error) {
        res.status(404).send({
             status: 'error',
             message: 'Album Not Found.',
        });
        throw error;
    };
};


//*  POST authenticated user's albums

const addAlbum = async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	};

    // Get ONLY the validated data from the request
	const validData = matchedData(req);
	validData.user_id = req.user.get('id')

	
	try {
		const album = await new models.Album(validData).save();
		debug("Added album to user successfully: %O", album);

		res.send({
			status: 'success',
			data: album
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a album to a user.',
		});
		throw error;
	};
};


//* PUT- Update aspecific album (/:albumId)

const updateAlbum = async (req, res) => {
    const albumId = req.params.albumId;
 
    // make sure album exists
    const album = await new models.Album({ id: albumId }).fetch({ require: false });
    if (!album) {
        debug("Album to update was not found. %o", { id: albumId });
        res.status(404).send({
            status: 'fail',
            data: 'Album Not Found',
        });
        return;
    }
 
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }
 
    // Get ONLY the validated data from the request
    const validData = matchedData(req);
 
    try {
        const updatedAlbum = await album.save(validData);
        debug("Updated album successfully: %O", updatedAlbum);
 
        res.send({
            status: 'success',
            data: {
                album,
            },
        });
 
    }  catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when updating a new album.',
         });
         throw error;
    };
};
 

module.exports = {
    getAlbums,
    getUserAlbum,
    addAlbum,
    updateAlbum,
};
 