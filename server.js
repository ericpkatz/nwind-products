var db = require('./db');
var http = require('http');

db.connect()
  .then(function(){
    console.log('connected to db');
    var server = http.createServer(require('./app'))
      .listen(process.env.PORT || 3000, function(){
        console.log('listening');
      });
    server.on('error', function(err){
      console.log(err);
    });
  }, function(err){
    console.log(err);
  });
