var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/flights000');
mongoose.connect('mongodb://zdoggie:***REMOVED***@ds059654.mlab.com:59654/flights001');
module.exports = mongoose.connection;
