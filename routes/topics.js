/* jshint node:true */
'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET all topics from DB */
router.get('/', function(req, res) {
	models.Topic.findAll({
		include: [
			models.Post
		]
	}).catch(function(error) {
		res.json(error.message);
	}).then(function(topics) {
		res.json(topics);
	});
});

/* GET a topic from DB by id */
router.get('/:topic_id', function(req, res) {
	models.Topic.findOne({
		include: [
			models.Post
		],
		where: {
			id: req.params.topic_id
		}
	}).catch(function(error) {
		res.json(error.message);
	}).then(function(topic) {
		res.json(topic);
	});
});

/* Create a new topic, then respond with new topic */
router.post('/create', function(req, res) {
	models.Topic.create({
		Name: req.body.name,
		Description: req.body.description
	}).catch(function(error) {
		res.json(error.message);
	}).then(function(newTopic) {
		res.json({
			id: newTopic.id,
			Name: newTopic.Name,
			Description: newTopic.Description
		});
	});
});

/* Update a certain existing topic record */
router.put('/:topic_id/update', function(req, res) {
	// Only allow certain fields to be updated
	var newValues = {};
	if (req.body.name !== null)
		newValues.Name = req.body.name;
	if (req.body.description !== null)
		newValues.Description = req.body.description;
		
	// Update record
	models.Topic.update(
		newValues,
		{
			where: { id: req.params.topic_id }
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