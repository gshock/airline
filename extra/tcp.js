var net = require('net'), 
    fs = require('fs'); 

var server = net.createServer(function (connect){
    var log = fs.createWriteStream('hfi.log');

    console.log('connection established'); 

    connect.on('end', function(){
        console.log('connection ended'); 
    });

    connect.write("welcome to heathrow flight information.\r\n"); 
    connect.write("We call it FHI: Heathrow Flight Information.\r\n"); 
    connect.write("We'll get your message and display it on board.\r\n"); 
    
    connect.pipe(connect).pipe(log);

});

server.listen(7777, function(){
    console.log('Server ready on port 7777');
});