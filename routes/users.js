var models = require('../models');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* Create new user */
router.post('/create', function(req, res) {
    // Generate salt
    var salt = bcrypt.genSaltSync(10);
    // Hash password with salt
    var hash = bcrypt.hashSync(req.body.password, salt);

    models.BlogUser.create({
        AuthUserStringId: req.body.username,
        Password: hash
    }).catch(function(error) {
        res.json({
            'success': false,
            'error': error.message
        });
    }).then(function(newUser) {
        res.json({
            'success': true,
            'hash': newUser.Password
        });
    });
});

module.exports = router;
