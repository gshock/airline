var fs = require('fs');

var stream = fs.createReadStream('data.js'); 

stream.pause(); 

console.log('paused');

setTimeout(function(){
    console.log('resuming...');
    stream.resume(); 
}, 1000);

stream.on('data', function(chunk){
    console.log('---start---');
    console.log(chunk.toString()); 
    console.log('---finish---');
});

stream.on('data', function(chunk){
    console.log('chunk length was: ' + chunk.length);
});

stream.on('end', function(){
    console.log('---end of file---');
});