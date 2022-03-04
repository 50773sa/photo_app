const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// GET
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'Yep, all good! 👍' }});
});

// auth.basic = middleware. Runs with everything that runs with profile
router.use('/profile', auth.basic, require('./profile'));
router.use('/albums', require('./albums'));
router.use('/photos',  require('./photos'));

module.exports = router;