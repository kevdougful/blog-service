/* jshint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	var Tag = sequelize.define('Tag', {
		TagText: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Tag.belongsToMany(models.Post, {
					through: 'PostTags'
				});
			}
		}
	});

	return Tag;
};