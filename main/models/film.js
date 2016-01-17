module.exports = function(sequelize, DataTypes) {
	return sequelize.define('film', {
		filmId : {
			type : DataTypes.INTEGER,
			primaryKey : true,
			field : 'film_id',
		},
		title : {
			type : DataTypes.STRING,
			field : 'title'
		},
		rentalRate : {
			type : DataTypes.REAL,
			field : 'rental_rate'
		}
	}, {
		timestamps : false,
		freezeTableName : false,
		tableName : 'film'
	});
}