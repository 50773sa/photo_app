//User model

 module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		visible: ['email', 'first_name', 'last_name'],// Password will be hidden in body i postman
		albums() {
			return this.hasMany('Album');
		},
		
	});
	
};

