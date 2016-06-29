//var express = require('express');
//var router = express.Router();
//http://webapplog.com/migrating-express-js-3-x-to-4-x-middleware-route-and-other-changes/


var flight = require('../flight');

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/

var flight1 = flight({
  number: 1, 
  origin: 'LAX', 
  destination: 'DCA', 
  departs: '9AM',
  arrives: '4PM'
});

var flight2 = flight({
  number: 2, 
  origin: 'LAX', 
  destination: 'PDX', 
  departs: '10AM',
  arrives: '12PM'
});

exports.index = function(req, res){
  res.render('index', { title: 'Express'}); 
};

exports.flight1 = function(req, res){
  res.json(flight1.getInformation());
};


exports.flight2 = function(req, res){
  res.json(flight2.getInformation());
};



