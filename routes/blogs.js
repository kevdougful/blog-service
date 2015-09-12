var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
	models.Blog.create({
		Name: req.body.name
	});
});

module.exports = router;