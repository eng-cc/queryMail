var express = require('express');
var user = require('../models/user.js');
var autoQuery = require('../controller/autoQuery.js')
var sendEmail = require('../controller/sendEmail.js')
var router = express.Router();

router.get('', function(req, res) {
    res.render('enter');
});

router.post('/post', function(req, res) {
    var msg = '';
    var postUser = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        msg: ''
    };
    autoQuery(postUser, function(bkMsg) {
        var postUser = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            msg: bkMsg
        };
        var newUser = new user(postUser);

        newUser.save(function(err, fullUser) {
            if (err) {
                console.log(err);
            };
            sendEmail(fullUser);
            //console.log('fullUser' + fullUser);
        });
    });
});
router.get('query', function(req, res) {
    var queryUser = {
        name: req.body.name,
        password: req.body.password
    };
    autoQuery(postUser, function(bkMsg) {
        res.json({
            succ: true,
            msg: bkMsg
        });
    });
});


module.exports = router;

var allUser = new user({})
allUser.all(function(err, users) {
    if (err) {
        console.log(err);
    }
    console.log(users)
})
