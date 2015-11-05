
var blogController = function(Model) {
	var get = function(req, res) {
		Model.Blog.findAll({
			include: [ 
				Model.Post 
			]
		})
		.catch(function(error) {
			res.json(error.message);
		})
		.then(function(blogs) {
			console.log('blogs: ' + blogs);
			if (blogs && blogs.length > 0) {
				res.json(blogs);
			} else {
				res.status(204);
				res.send('No blog objects found.');
			}
		});
	};
	
	var getById = function(req, res) {
		Model.Blog.findOne({
			include: [ 
				Model.Post
			],
			where: {
				id: req.params.blog_id
			}
		}).catch(function(error) {
			res.json(error.message);
		}).then(function(blog) {
			res.json(blog);
		});
	};
	
	var create = function(req, res) {
		Model.Blog.create({
			Name: req.body.name,
			Description: req.body.description,
			DateCreated: Date()
		}).catch(function(error) {
			res.json(error.message);
		}).then(function(newBlog) {
			res.json({ 
				id: newBlog.id,
				Name: newBlog.Name,
				Description: newBlog.Description,
				DateCreated: newBlog.DateCreated
			});
		});
	};
	
	var update = function(req, res) {
		// Only allow certain fields to be updated
		var newValues = {};
		if (req.body.name !== null)
			newValues.Name = req.body.name;
		if (req.body.Description !== null)
			newValues.Description = req.body.description;
	
		// Update record
		Model.Blog.update(
			newValues,
			{
				where: { id: req.params.blog_id }
			}
		).catch(function(error) {
			res.json(error.message);
		}).then(function(effectedRows) {
			res.json({
				effectedRows: effectedRows
			});
		});
	}
	
	var createPost = function(req, res) {
		Model.Post.create({
			Title: req.body.title,
			Content: req.body.content,
			DateCreated: Date(),
			CommentsAllowed: req.body.commentsAllowed,
			BlogId: req.params.blog_id,
			TopicId: req.body.topicId,
			BlogUserId: req.body.blogUserId
		}).catch(function(error) {
			res.json(error.message);
		}).then(function(newPost) {
			res.json(newPost);
		});
	};
	
	return {
		get: get,
		getById: getById,
		create: create,
		update: update,
		createPost: createPost
	}
}

module.exports = blogController;