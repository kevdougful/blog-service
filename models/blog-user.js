/* jshint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	var BlogUser = sequelize.define('BlogUser', {
		AuthUserIntId: DataTypes.INTEGER,
		AuthUserStringId: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				BlogUser.belongsTo(models.UserProfile, {
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