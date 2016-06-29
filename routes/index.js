//http://webapplog.com/migrating-express-js-3-x-to-4-x-middleware-route-and-other-changes/

var flights = require('../data');
var flight = require('../flight');

exports.index = function(req, res){
  res.render('index', { title: 'Express'}); 
};

for (var number in flight) {
  flight[number] = flight(flights[number]);
};

exports.flight = function(req, res){
  var number = req.param(number);
  if (typeof flights[number] === 'undefined')  {
    res.status(404).json({status:'error'});
  }else{
    res.json(flights[number].getInformation());
  }
};



