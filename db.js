var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/flights000');
module.exports = mongoose.connection;
