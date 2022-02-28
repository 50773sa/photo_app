const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// GET
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'Yep, all good! 👍' }});
});

router.use('/users', require('./users'));//auth.basic, lägg middleware här för att den ska köras på alla som börjar med users
router.use('/albums', require('./albums'));
//router.use('/photos',  require('./photos'));



module.exports = router;