//http://webapplog.com/migrating-express-js-3-x-to-4-x-middleware-route-and-other-changes/

var FlightSchema = require('../schema/flight');

module.exports = function (flightsData) {

  var flights = flightsData;

  //TODO: can remove this later?
  if (flights === 'undefined') {
    flights = require('../data')
  }

  var flight = require('../flight');

  for (var number in flights) {
    flights[number] = flight(flights[number]);
  };

  var functions = {};

  functions.flight = function (req, res) {
    var number = req.params.number;
    req.session.lastNumber = number;

    if (typeof flights[number] === 'undefined') {
      res.status(404).json({ status: 'error' });
    } else {
      res.json(flights[number].getInformation());
    }
  };

  functions.arrived = function (req, res) {
    var number = req.params.number;

    if (typeof flights[number] === 'undefined') {
      res.status(404).json({ status: 'error' });
    } else {
      flights[number].triggerArrive();

      var record = new FlightSchema(flights[number].getInformation());
      record.save(function (err) {
        if (err) {
          console.log(err);
          res.status(500).json({ status: 'failure' });
        } else {
          res.json({ status: 'success' });
        };
      });

    }
  };

  functions.list = function (req, res) {
    res.render('list', { title: 'All Flights', flights: flights });
  }

  functions.index = function (req, res) {
    res.render('index', { title: 'Flight System' });
  };

  functions.arrivals = function (req, res) {
    FlightSchema.find().setOptions({ sort: 'actualArrive' })
      .exec(function (err, arrivals) {
        if (err) {
          console.log(err);
          res.status(500).json({ status: 'failure' });
        } else {
          res.render('arrivals', {
            title: 'Arrivals',
            arrivals: arrivals,
            lastNumber: req.session.lastNumber
          });
        };
      });
  };

  functions.login = function(req, res){
    res.render('Login', {title: 'Login'});
  };

  functions.user = function(req, res){
    if(req.session.passport.user){
        res.render('user', {title:'Welcome', user: req.user});
    }else{
        res.redirect('/login');
    };
  };

  return functions;
}

