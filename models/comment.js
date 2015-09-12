/* jshint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	var Comment = sequelize.define('Comment', {
		Content: DataTypes.STRING,
		DateCreated: DataTypes.DATE,
		IsEdited: DataTypes.BOOLEAN,
		Karma: DataTypes.INTEGER
	}, {
		classMethods: {
			associate: function(models) {
				Comment.belongsTo(models.Post, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});

	return Comment;
};