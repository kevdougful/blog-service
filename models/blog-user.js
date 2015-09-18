/* jshint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	var BlogUser = sequelize.define('BlogUser', {
		AuthUserIntId: DataTypes.INTEGER,
		AuthUserStringId: DataTypes.STRING,
		// Storing plain text for now (will ultimately store hashes)
		Password: DataTypes.STRING,
		CanPost: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		CanComment: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		Admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
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
					foreignKey: 'BlogUserId'
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