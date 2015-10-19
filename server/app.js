// Express init
var express = require('express');
var app = express();

// other packages
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJwt = require('express-jwt');

// Node environment variables and configration
//var dotenv = require('dotenv').load();
var config = require('./config/env/development');

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/interviewly_dev');

// server configration
var port = process.env.PORT || config.port;

// require routes
var index = require('./routes/index');
var authenticate = require('./routes/Authenticate');
var csvtojson = require('./routes/csvtojson');
var forgot = require('./routes/forgot');
var test = require('./routes/test');
var reset = require('./routes/reset');

// require APIs
var api = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'jade');

// serve favicon

app.use(favicon(path.join(__dirname, '..', 'client/app/assets/img', 'favicon.png')));

// log stuff
app.use(logger('dev'));

// parse req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse cookies
app.use(cookieParser());

// serve assets
app.use(express.static(path.join(__dirname, '..', 'client', 'app')));

// use routes
app.use('/', index);
app.use('/test', test);
app.use('/authenticate', authenticate);
app.use('/csvtojson', csvtojson);
app.use('/forgot', forgot);
app.use('/reset', reset);

// use APIs
app.use('/api', api);
app.use('*', index);

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
