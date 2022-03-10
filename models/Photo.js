
// PHOTO MODEL

 module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		albums() {
			return this.hasMany('Album');   
		},
		users() {
			return this.belongsTo('User');
		}
	});
}
