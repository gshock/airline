//http://webapplog.com/migrating-express-js-3-x-to-4-x-middleware-route-and-other-changes/

var flights = require('../data');
var flight = require('../flight');

for (var number in flights) {
  flights[number] = flight(flights[number]);
};

exports.flight = function(req, res){
  var number = req.params.number;

  if (typeof flights[number] === 'undefined')  {
    res.status(404).json({status:'error'});
  }else{
    res.json(flights[number].getInformation());
  }
};

exports.arrived = function(req, res){
  var number = req.params.number;

  if (typeof flights[number] === 'undefined')  {
    res.status(404).json({status:'error'});
  }else{
    flights[number].triggerArrive();
    res.json({status: 'done'});
  }
};

exports.list = function(req, res){
  res.render('list', {title: 'All Flights', flights: flights});
}

exports.index = function(req, res){
  res.render('index', { title: 'Express'}); 
};



