
// ALBUM CONTROLLER

const bcrypt = require('bcrypt');
 const debug = require('debug')('photo_app:album_controller');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');

 
//* GET all albums

 const index = async (req, res) => {
     const albums = await models.Album.fetchAll();
 
     res.send({
         status: 'success',
         data: {
            user: albums
         }
     });
 };
 

 //* GET a specific album (/:albumId)

 const show = async (req, res) => {
     const album = await new models.Album({ id: req.params.albumId }) 
         .fetch({ withRelated: ['albums'] });
 
     res.send({
         status: 'success',
         data: {
             album,
         }
     });
 };

 





 //* PUT- Update aspecific album (/:albumId)

 const update = async (req, res) => {
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
 
     // check for any validation errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
 
     // get only the validated data from the request
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
 
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when updating a new album.',
         });
         throw error;
     }
 }
 

 module.exports = {
     index,
     show,
     update,
 }
 