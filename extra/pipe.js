var fs = require('fs');

var stream = fs.createReadStream('data.js'), 
    writable = fs.createWriteStream('data_copy.js'); 

stream.pipe(process.stdout);

stream.pipe(writable); 
