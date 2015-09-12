/* jshint node:true */
'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

fs
  .readdirSync(__dirname)
  // Read every file in models dir (except index.js)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    // Import each module
    var model = sequelize.import(path.join(__dirname, file));
    // Add to db object
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  // Check each model for an 'associate' method
  if ('associate' in db[modelName]) {
    // If found, run that method
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
