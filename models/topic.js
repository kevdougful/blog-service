/* jshint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	var Topic = sequelize.define('Topic', {
		Name: DataTypes.STRING,
		Description: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Topic.hasMany(models.Post, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});

	return Topic;
};