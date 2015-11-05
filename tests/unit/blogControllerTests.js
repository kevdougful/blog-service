var sinon = require('sinon');
var should = require('should');
var models = require('../../models');
var async = require('async');

describe('Blog Controller Unit Tests', function() {
	describe('GET (all)', function() {
		it('Responds with 204 if no blog posts exist.', function() {
			
			var Model = {
				Blog: models.Blog.build({ },
				{ 
					include: [ models.Post ] 
				})
			};
			
			Model.Blog.findAll = function() {
				var p = new Promise(function(resolve, reject) {
					var blogs = [];
					resolve(blogs);
				});
				
				return p;
			};
			
			var req = {};
			
			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};
			
			var blogController = require('../../controllers/blogController')(Model);
			
			async.waterfall([
					function(callback) {
						blogController.get(req, res);
						callback(null, res);
					}
				], 
				function(err, result) {
					console.log(result.status.args[0]);
					result.status.calledWith(204).should.equal(true, 'Bad status' + result.status.args[0][0]);
				});
				
		});
		
		it('Responds with a 200 if returning values.', function() {
			var Model = {
				Blog: models.Blog.build({ },
				{
					include: [ models.Post ]
				})
			};
			
			Model.Blog.findAll = function() {
				var p = new Promise(function(resolve, reject) {
					var blogs = [ 
						{ 
							Name: 'Test Blog', 
							Description: 'This is a unit test blog.',
							DateCreated: Date.now()
						},
						{
							Name: 'A second test blog',
							Description: 'This is another unit test blog.',
							DateCreated: Date.now()
						}
					];
					resolve(blogs);
				});
				
				return p;
			};
			
			var req = {};
			
			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};
			
			var blogController = require('../../controllers/blogController')(Model);
			
			async.waterfall([
					function(callback) {
						blogController.get(req, res);
						callback(null, res);
					}
				], 
				function(err, result) {
					console.log(result.status.args[0]);
					result.status.calledWith(200).should.equal(true, 'Bad status' + result.status.args[0][0]);
				});
				
		});
	});
});