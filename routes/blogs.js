var models  = require('../models');
var express = require('express');
var router  = express.Router();
var auth = require('./auth-token');

router.use(auth);

/* GET all blogs from DB */
router.get('/', function(req, res) {
	models.Blog.findAll({
		include: [ 
			models.Post 
		]
	}).catch(function(error) {
		res.json(error.message);
	}).then(function(blogs) {
		res.json(blogs);
	});
});

/* GET a blog from DB by id */
router.get('/:blog_id', function(req, res) {
	models.Blog.findOne({
		include: [ 
			models.Post
		],
		where: {
			id: req.params.blog_id
		}
	}).catch(function(error) {
		res.json(error.message);
	}).then(function(blog) {
		res.json(blog);
	});
});

/* Create a new blog, then respond with new blog */
router.post('/create', function(req, res) {
	models.Blog.create({
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
});

/* Update a certain existing blog record */
router.put('/:blog_id/update', function(req, res) {
	// Only allow certain fields to be updated
	var newValues = {};
	if (req.body.name !== null)
		newValues.Name = req.body.name;
	if (req.body.Description !== null)
		newValues.Description = req.body.description;

	// Update record
	models.Blog.update(
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
});

/* Create a new post on a specific blog */
router.post('/:blog_id/posts/create', function(req, res) {
	models.Post.create({
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
});

module.exports = router;