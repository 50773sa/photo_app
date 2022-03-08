/**
 * Book model
 */

 module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		albums() {
			return this.belongsTo('Album');   
		},
		users() {
			return this.belongsTo('User');//ett foto tillhör en användare
		}
	});
}
