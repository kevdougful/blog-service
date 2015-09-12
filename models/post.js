/* jshint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	var Post = sequelize.define('Post', {
		Title: DataTypes.STRING,
		Content: DataTypes.STRING,
		DateCreated: DataTypes.DATE,
		CommentsAllowed: DataTypes.BOOLEAN
	}, {
		classMethods: {
			associate: function(models) {
				Post.belongsTo(models.Blog, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});

	return Post;
};