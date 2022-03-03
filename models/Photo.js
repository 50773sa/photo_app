/**
 * Book model
 */

 module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		album() {
			return this.belongsToMany('Album');   // ett foto kan tillhöra många album
		},
		users() {
			return this.belongsTo('User');//ett foto tillhör en användare
		}
	});
}
