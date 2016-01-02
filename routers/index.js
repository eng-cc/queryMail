var express = require('express');
var user = require('../models/user.js');
var autoQuery = require('../controller/autoQuery.js')
var sendEmail = require('../controller/sendEmail.js')
var router = express.Router();

router.get('', function(req, res) {
    res.render('enter');
});

router.post('/post', function(req, res) {
    res.header('Access-Control-Allow-Origin','*');
    var postUser = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        msg: ''
    };
    var newUser = new user(postUser);
    newUser.query(function(err, haveUser) {
        if (err) {
            console.log(err);
            res.header('Access-Control-Allow-Origin','*');
            res.json({
                succ: false,
                msg: 'err'
            });
        };
        if (haveUser && haveUser.name == postUser.name) {
            res.header('Access-Control-Allow-Origin','*');
            res.json({
                succ: false,
                msg: '用户已注册'
            });
        } else {
            autoQuery(postUser, function(bkMsg) {
                newUser.msg = bkMsg;
                //console.log(req.body)
                newUser.save(function(err, fullUser) {
                    if (err) {
                        console.log(err);
                        res.header('Access-Control-Allow-Origin','*');
                        res.json({
                            succ: false,
                            msg: 'err'
                        });
                    };
                    sendEmail(fullUser);
                    res.header('Access-Control-Allow-Origin','*');
                    res.json({
                        succ: true,
                        msg: fullUser
                    });
                    //console.log('fullUser' + fullUser);
                });
            });
        };
    });
});
router.get('query', function(req, res) {
    var queryUser = {
        name: req.body.name,
        password: req.body.password
    };
    autoQuery(postUser, function(bkMsg) {
        res.header('Access-Control-Allow-Origin','*');
        res.json({
            succ: true,
            msg: bkMsg
        });
    });
});


module.exports = router;

/*var allUser = new user({})
allUser.all(function(err, users) {
    if (err) {
        console.log(err);
    }
    console.log(users)
})*/
