var models  = require('../models');
var express = require('express');

var auth = require('./auth-token');


var routes = function(Model) {
	var router  = express.Router();
	//router.use(auth);
	
	var blogController = require('../controllers/blogController')(Model);
	
	/* GET all blogs from DB */
	router.get('/', blogController.get);
	
	/* GET a blog from DB by id */
	router.get('/:blog_id', blogController.getById);
	
	/* Create a new blog, then respond with new blog */
	router.post('/create', blogController.create);
	
	/* Update a certain existing blog record */
	router.put('/:blog_id/update', blogController.update);
	
	/* Create a new post on a specific blog */
	router.post('/:blog_id/posts/create', blogController.createPost);
	
	return router;
}

module.exports = routes;