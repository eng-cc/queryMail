var accounts = require('./conf.js').accounts;
var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var log4 = require('log4js');

var routers = require('./routers/index.js');
var runAll = require('./controller/index.js');

log4.configure({
    appenders:[{
        type: 'console'
    }, {
        type: 'file',
        filename: 'logs/access.log',
        maxLogSize: 1024,
        backups: 3,
        category: 'normal'
    }],
    replaceConsole: true
});
/*var logs = log4.getLogger('normal');
logs.setLevel('INFO');*/

runAll();

var app = express();

app.use(log4.connectLogger(log4.getLogger("cheese"), {level: log4.levels.INFO}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//设置文件静态路径
app.use(express.static(path.join(__dirname, 'static')));
//输出http状态码
app.use(logger('dev'));
//解析body传输的内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//路由

app.use('/', routers);

//app.use('/api',apis);

//404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(process.env.PORT || 5000);
