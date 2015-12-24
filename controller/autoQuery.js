var request = require('request').defaults({
    jar: true
});
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var sendEmail = require('./sendEmail');

var msg = '';

var headers = {

}

var origin = 'http://online.ncu.edu.cn',
    urls = {
        login: origin + '/eol/homepage/common/login.jsp',
        result: origin + '/eol/welcomepage/student/index.jsp'
    }


var autoQuery = function(account,cb) {
    //console.log(account)
    var loginOpts = {
        url: urls.login,
        encoding: null,
        form: {
            'IPT_LOGINUSERNAME': account.name,
            'IPT_LOGINPASSWORD': account.password
        }
    };

    request.post(loginOpts, function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log(res.statusCode);
            //console.log(body);
            var chunks = [];
            chunks.push(body);
            var html = iconv.decode(Buffer.concat(chunks), 'gbk');
            //console.log(html);
        };

        var indexOpts = {
            url: urls.result,
            encoding: null
        };
        request.get(indexOpts, function(err, res, body) {
            if (err) {
                console.log(err);
            } else {
                console.log(res.statusCode);
                var chunks = [];
                chunks.push(body);
                var html = iconv.decode(Buffer.concat(chunks), 'gbk');
                var back = parse(html);
                cb(back);
            };
        })
    });
};



var parse = function(html) {
    var $ = cheerio.load(html, {
        decodeEntities: false
    });
    //console.log($('#reminder').html());
    msg += $('#reminder').html();
    //console.log('qureymsg');
    return msg;
}




module.exports = autoQuery;
