/**
 * Author Validation Rules
 */

 const { body } = require('express-validator');
 
 
 //*  Create Album validation rules

 const createRules = [
     body('title').exists().isLength({ min: 3 }),
     body('userId').exists().isLength({ min: 1 }),
 ];

 //* Update Album validation rules


 
 module.exports = {
     createRules,
 }
 