var models  = require('../models');
var express = require('express');
var router  = express.Router();

/* Create a new blog, then respond with new id */
router.post('/create', function(req, res) {
	models.Blog.create({
		Name: req.body.name,
		Description: req.body.description,
		DateCreated: Date()
	}).then(function(newBlog) {
		res.json({ 
			id: newBlog.id,
			Name: newBlog.Name,
			Description: newBlog.Description,
			DateCreated: newBlog.DateCreated
		});
	});
});

module.exports = router;