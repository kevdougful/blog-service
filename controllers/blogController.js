
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
	}
	
	
	
	return {
		get: get
	}
}

module.exports = blogController;