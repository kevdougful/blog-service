/* jshint node:true */
'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET all comments from DB */
router.get('/', function(req, res) {
	models.Comment.findAll({
		
	}).catch(function(error) {
		res.json(error.message);
	}).then(function(comments) {
		res.json(comments);
	});
});

/* GET a comment from DB by id */
router.get('/:comment_id', function(req, res) {
	models.Comment.findOne({
		where: {
			id: req.params.comment_id
		}
	}).catch(function(error) {
		res.json(error.message);
	}).then(function(comment) {
		res.json(comment);
	});
});

/* Create a new comment, then respond with new comment */
router.post('/create', function(req, res) {
	models.Comment.create({
		Content: req.body.content,
		DateCreated: Date(),
		IsEdited: false,
		Karma: 0,
		PostId: req.body.postId,
		BlogUserId: req.body.blogUserId
	}).catch(function(error) {
		res.json(error.message);
	}).then(function(newComment) {
		res.json({
			id: newComment.id,
			Name: newComment.Name,
			Description: newComment.Description
		});
	});
});

/* Update a certain existing comment record */
router.put('/:comment_id/update', function(req, res) {
	// Only allow certain fields to be updated
	var newValues = {};
	if (req.body.name !== null)
		newValues.Name = req.body.name;
	if (req.body.description !== null)
		newValues.Description = req.body.description;
		
	// Update record
	models.Comment.update(
		newValues,
		{
			where: { id: req.params.comment_id }
		}
	).catch(function(error) {
		res.json(error.message);
	}).then(function(effectedRows) {
		res.json({
			effectedRows: effectedRows
		});
	});
});

module.exports = router;