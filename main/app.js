"use strict"
var log4js = require('log4js');
log4js.configure("./log4js-configuration.json", {});
var logger = log4js.getLogger(__filename);

var Sequelize = require('sequelize');
var sequelize = new Sequelize('', '', '', {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: '../database/films.db'
});

sequelize.import("./models/film.js");
sequelize.sync().then(function(result) {
	global.sequelize = sequelize;
	initWebapp();
}, function(err) {
	console.log('An error occurred while creating the table:', err);
});

function initWebapp() {
	var express = require('express');
	var exphbs  = require('express-handlebars');
	var path = require('path');
	var app = express();
	
	app.use("/static", express.static(path.join(__dirname, '/static')));
	
	var filmsRoute = require('./routes/FilmRoute');
	app.use('/films', filmsRoute);
	
	var hbs = exphbs.create({defaultLayout: 'main'});
	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');
		
	app.listen(3000);
}