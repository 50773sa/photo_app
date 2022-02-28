//User model

 module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		album() {
			return this.belongsToMany('Album');
		}
	});
};
