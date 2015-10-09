// Express init
var express = require('express');
var app = express();

// other packages
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Node environment variables and configration
//var dotenv = require('dotenv').load();
var config = require('./config/env/development');

// server configration
var port = process.env.PORT || config.port;

// require routes
var index = require('./routes/index');

// require APIs
var users = require('./routes/users');

// view engine setup
// TODO update gulpfile to compile Jade files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// serve favicon
app.use(favicon(path.join(__dirname, '..', 'client', 'favicon.png')));

// log stuff
app.use(logger('dev'));

// parse req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse cookies
app.use(cookieParser());

// serve assets
app.use(express.static(path.join(__dirname, '..', 'client', 'assets')));


// use routes
app.use('/', index);

// use APIs
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
