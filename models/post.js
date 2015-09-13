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
				Post.belongsTo(models.Topic, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
				Post.belongsToMany(models.Tag, {
					through: 'PostTags'
				});
				Post.hasMany(models.Comment, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
				Post.belongsTo(models.BlogUser, {
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