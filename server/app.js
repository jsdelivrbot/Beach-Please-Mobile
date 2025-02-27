var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var imgur = require('imgur');
var multer = require('multer');


var routes = require('./routes/index');
var users = require('./routes/users');
var beaches = require('./routes/beaches');
var upload = require('./routes/upload');

var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:grandescenas123@ds055680.mongolab.com:55680/beach_please',
    function(err) {
        if(err) {
            console.log('connection error', err);
        } else {
            console.log('connection successful');
        }
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/users', users);
app.use('/beaches', beaches);
app.use('/upload/', upload);
app.use('/', routes);

app.use(multer({
            dest:'./uploads/',
            rename: function (fieldname, filename) {
                return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
            }
        }
    ));

// catch 404 and forward to error handler
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




module.exports = app;
