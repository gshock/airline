module.exports = function (flights, db) {

  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var expressSession = require('express-session');
  var MongoStore = require('connect-mongo')(expressSession);
  var passport = require('./auth');
  var bodyParser = require('body-parser');

  //var flights = require('./data');
  var routes = require('./routes')(flights);
  //var users = require('./routes/users');

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  
  app.use(cookieParser());

  app.use(expressSession({
    secret: 'topsecret',
    store: new MongoStore({mongooseConnection: db }),
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Flight Tracker');
    next();
  });

  //app.use('/users', users);

  app.route('/').get(routes.index);
  app.route('/flight/:number').get(routes.flight);
  app.route('/flight/:number/arrived').put(routes.arrived);
  app.route('/list').get(routes.list);
  app.route('/arrivals').get(routes.arrivals);

  app.route('/login').get(routes.login);
  app.route('/login').post(passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/user'
  }));
  app.route('/user').get(routes.user);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  //module.exports = app;
  return app;
}