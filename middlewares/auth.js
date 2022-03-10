
//AUTHENTICATION MIDDLEWARE

 const bcrypt = require('bcrypt');
 const debug = require('debug')('photo_app:auth');
 const { User } = require('../models');

    

//*  HTTP Basic Authentication
  
const basic = async (req, res, next) => {
	debug("Hello from auth.basic!");
 
	// Make sure Authorization header exists, otherwise bail
	if (!req.headers.authorization) {
		debug("Authorization header missing");
 
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization required',
		});
	};
 
	debug("Authorization header: %o", req.headers.authorization);
 
	const [authSchema, base64Payload] = req.headers.authorization.split(' ');
 
	// If authSchema isn't "basic", then bail
	if (authSchema.toLowerCase() !== "basic") {
		debug("Authorization schema isn't basic");
 
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization required',
		});
	};
 
	// Decode payload from base64 => ascii
	const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');
 
	// split decoded payload into "<email>:<password>"
	const [email, password] = decodedPayload.split(':');
 
	// Find user based on the email (bail if no such user exists)
	const user = await new User({ email }).fetch({ require: false });
	if (!user) {
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}
	const hash = user.get('password');
 
	// Hash the incoming cleartext password using the salt from the database
	// and compare if the generated hash matches the database-hash
	const result = await bcrypt.compare(password, hash);
	if (!result) {
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	};
 
	// Attach user to request
	req.user = user;
 
	// Pass request along
	next();
};
 
module.exports = {
	basic,
};


