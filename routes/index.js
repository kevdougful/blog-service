/* jshint node:true */
'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json');
var jwtSecret = config.jwtAuth.secret;
var facebook = config.facebook;

/* Passport.js setup */
passport.use(new FacebookStrategy({
        clientID: facebook.appId,
        clientSecret: facebook.appSecret,
        callbackURL: facebook.callbackURL[env]
    },
    function(accessToken, refreshToken, profile, done) {
        models.BlogUser.findOrCreate({
            where: {
                AuthUserStringId: profile.id
            },
            defaults: {
                Password: accessToken
            }, 
        }).spread(function(user, created) {
            console.log(user.get({
                plain: true
            }));
            console.log(created);
            passport.serializeUser(function(userr, doner) {
                doner(null, userr);
            });
            //done(null, user);
        });
        // }).catch(function(error) {
        //     done(error);
        // }).then(function(user) {
        //     done(null, user);
        // });
    })
);

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
            var token = jwt.sign(user, jwtSecret, {
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

/* Login with Facebook */
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));


module.exports = router;
