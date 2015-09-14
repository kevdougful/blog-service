/* jshint node:true */
'use strict';

var assert = require('chai').assert;

describe('models/index', function() {
	it('returns the blog model', function(done) {
		var models = require('../../models');
		//expect(models.Blog).to.be.ok;
		assert.ok(models.Blog);
		done();
	});
});