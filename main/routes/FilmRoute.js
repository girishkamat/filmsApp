"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger(__filename);

class FilmsRoute
{
	constructor() {
		this._filmRepository = require("../repository/FilmRepository");
		this._router = require('express').Router();
		this.registerPaths();
	}
	
	get router() {
		return this._router;
	}
	
	set router(value) {
		this._router = value;
	}
	
	registerPaths() {
		var self = this;
		this._router.get("/list", function(req, res, next) {
			self.getFilms(req,res,next);
		});
	}
	
	getFilms(req, res, next) {
		this._filmRepository.getFilms(function(films) {
			    logger.info("List of films ["+JSON.stringify(films)+"]");
				res.render("films", {
					films : films
				});
		});
	}
}

module.exports = new FilmsRoute().router;