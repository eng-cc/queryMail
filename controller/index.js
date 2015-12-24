var laterRun = require('./task.js');
var sendEmail = require('./sendEmail.js');
var autoQuery = require('./autoQuery.js');
var user = require('../models/user.js');

var works = function() {
	console.log('works')
	var allUser = new user({})
    allUser.all(function(err, users) {
        if (err) {
            console.log(err);
        };
        users.forEach(function(use) {
            autoQuery(use, function(msg) {
                if (use.msg != msg) {
                	console.log('===================================');
                	console.log('有新通知');
                	console.log('===================================');
                    sendEmail(use, msg);
                    use.msg = msg;
                    var newUser = new user(use);
                    newUser.updateMsg(function(err, user) {
                        if (err) {
                            console.log(err);
                        };
                        //console.log(use);
                        //console.log(user);
                        sendEmail(user);
                    });
                };
            });
        });
    });
};

var runAll = function() {
	//console.log('runAll');
    laterRun(20, works);
};

module.exports = runAll;
