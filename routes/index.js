/* jshint node:true */
'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var secret = require('../config/secret').secret;

/* Authenticate */
router.post('/auth', function(req, res) {
    models.BlogUser.findOne({
        where: {
            AuthUserStringId: req.body.username    
        }
    }).catch(function(error) {
        res.json({
            'success': false,
            'error': 'Authentication failed.' + error.message
        });
    }).then(function(user) {
        // Use same message for bad username or password
        var authErrorMessage = 'Authentication failed. User/password incorrect';
        
        // User not found
        if (!user) {
            res.json({
                'success': false,
                'error': authErrorMessage
            });
        }
        
        var passwordMatch = bcrypt.compareSync(req.body.password, user.Password);
        
        // User found, wrong password
        if (!passwordMatch) {
            res.json({
                'success': false,
                'error': authErrorMessage
            });
        } else {
            // User found, password matches
            // Create a token
            var token = jwt.sign(user, secret, {
                expiresInMinutes: 1440 // 24 hours
            });
            
            // Return new token
            res.json({
                'success': true,
                'token': token
            });
        }
    });
});

module.exports = router;
