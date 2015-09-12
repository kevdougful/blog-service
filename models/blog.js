/* jshint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	var Blog = sequelize.define('Blog', {
		Name: DataTypes.STRING,
		Description: DataTypes.STRING,
		DateCreated: DataTypes.DATE
	}, {
		classMethods: {
			associate: function(models) {
				Blog.hasMany(models.Post, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});

	return Blog;
};