var db = require('./db');
var http = require('http');

db.connect()
  .then(function(){
    console.log('connected to db');
    http.createServer(require('./app'))
      .listen(process.env.PORT || 3000, function(){
        console.log('listening');
      });
  });
