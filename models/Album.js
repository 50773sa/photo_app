//User model

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		users() {
			return this.belongsTo('User');
		},
     
	});
};
