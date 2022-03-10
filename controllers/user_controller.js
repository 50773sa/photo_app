
// PROFILE_CONTROLLER 

//*  GET authenticated user's profile

const getUser = async (req, res) => {
	
	res.send({
		status: 'success',
		data: {
			user: req.user,	 
		}
	});
};
 

module.exports = {
	getUser,
};