/* jshint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	var UserProfile = sequelize.define('UserProfile', {
		FirstName: DataTypes.STRING,
		LastName: DataTypes.STRING,
		EmailAddress: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				UserProfile.belongsTo(models.BlogUser, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});

	return UserProfile;
};