var sinon = require('sinon');
var should = require('should');
var models = require('../../models');

describe('Blog Controller Unit Tests', function() {
	describe('GET', function() {
		it('Responds with 204 if no blog posts exists.', function() {
			// var Model = {
			// 	Blog: {
			// 		findAll: function() {
			// 			return [];
			// 		}
			// 	},
			// 	Post: { }
			// }
			var Model = {
				Blog: models.Blog.build({
					
				}, 
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
			
			blogController.get(req, res);
			console.log(res.status.args[0]);
			res.status.calledWith(204).should.equal(true, 'Bad status' + res.status.args[0][0]);
		});
	});
});