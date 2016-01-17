"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger(__filename);

class FilmRepository {
	constructor() {
		this._sequelize = global.sequelize;
	}
	
	getFilms(callback) {
		logger.info("In getFilms. Will return top 10 films in alphabetical order");
		this._sequelize.models['film'].all({limit:10}).then(callback);
	}
}

module.exports = new FilmRepository();