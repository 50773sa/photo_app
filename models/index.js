// Setting up the database connection
const knex = require('knex')({
	debug: true,
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'photo_app',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'photo_app',
	}
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.User = require('./User')(bookshelf);
models.Album = require('./Album')(bookshelf);
//models.Photo = require('./Photo')(bookshelf);


//Med tre prickar framför models blir det en spread = Läser in alla models samtidigt
module.exports = {
	bookshelf,
	...models,
};
