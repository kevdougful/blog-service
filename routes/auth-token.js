/* jshint node:true */
'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var secret = require('../config/config.json').jwtAuth.secret;

module.exports = function(req, res, next) {
    // Check header, url parameters, or post parameters for token
    var token  = req.body.token || req.query.token || req.headers['x-access-token'];
   
    // Decode token
    if (token) {
        jwt.verify(token, secret, function(error, decoded) {
            if (error) {
                return res.json({
                    'success': false,
                    'error': 'Failed to authenticate token.'
                });
            } else {
                // Token valid, save to request and callback
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // No token sent
        // Return 403: Authorization required
        return res.status(403).send({
            'success': false,
            'error': 'No token provided'
        });
    }
};