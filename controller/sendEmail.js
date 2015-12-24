var email = require('../conf.js').email;
var nodemailer = require('nodemailer');

var transports = nodemailer.createTransport({
    service: '163',
    host: email.host,
    secureConnection: true,
    auth: {
        user: email.user,
        pass: email.password
    }
});

var sendEmail = function(account) {
    var opts = {
        from: email.user,
        to: account.email,
        subject: '课程通知',
        html: account.msg || '没有提醒'
    };
    transports.sendMail(opts, function(err, res) {
        if (err) {
            console.log('mail' + err)
        } else {
            console.log('send:' + res.response);
        }
        transports.close();
    });
};

module.exports = sendEmail;
