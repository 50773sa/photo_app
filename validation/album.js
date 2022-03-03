/**
 * Album Validation Rules
 */

 const { body } = require('express-validator');
 
 
 //*  Create Album validation rules

 const createRules = [
     body('title').exists().isLength({ min: 3 }),
     body('user_id').exists().isInt({ min: 1 }),
 ];

 //* Update Album validation rules

 const updateRules = [
    body('title').optional().isLength({ min: 3 }),
];


 
 module.exports = {
     createRules,
     updateRules
 }
 