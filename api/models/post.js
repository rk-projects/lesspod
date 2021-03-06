'use strict';
module.exports = (sequelize, DataTypes) => {

	var UserPost = sequelize.define('UserPost', {
		id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
		UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        PostId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
	});

	var PostTag = sequelize.define('PostTag', {
		id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
		PostId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TagId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
	});

	var Post = sequelize.define('Post', {
		id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
		title: { type: DataTypes.STRING, allowNull: false },
		content: { type: DataTypes.TEXT, allowNull: false },
        tags: { type: DataTypes.STRING, allowNull: false },
        pageURL: { type: DataTypes.STRING, allowNull: true }

	});

	Post.associate = function(models){
		this.Users = this.belongsToMany(models.User, {through: 'UserPost'});
		this.Tags = this.belongsToMany(models.Tag, {through: 'PostTag'});
	};

	Post.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	PostTag.sync({force: false});
	UserPost.sync({force: false});
	Post.sync({force: false});
	return Post;
};