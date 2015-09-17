var models = require('../models');
var express = require('express');
var router = express.Router();

/* Create new user */
router.post('/create', function(req, res, next) {
    models.BlogUser.create({
        AuthUserStringId: req.body.username,
        Password: req.body.password,
    }).catch(function(error) {
        res.json({
            'success': false,
            'error': error.message
        });
        // next(error);
    }).then(function(newUser) {
        res.json({
            'success': true 
        });
    });
});

module.exports = router;
