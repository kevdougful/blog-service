/* jshint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	var BlogUser = sequelize.define('BlogUser', {
		AuthUserIntId: DataTypes.INTEGER,
		AuthUserStringId: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				BlogUser.hasOne(models.UserProfile, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
				BlogUser.belongsToMany(models.Post, {
					through: 'BlogUserPosts',
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
				BlogUser.belongsToMany(models.Comment, {
					through: 'BlogUserComments',
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});

	return BlogUser;
};