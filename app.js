var express = require('express');
var swig = require('swig');
swig.setDefaults({cache: false});

var app = express();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

module.exports = app;


app.get('/', function(req, res, next){
  res.render('index', { mode: 'home' });
});

app.get('/products', function(req, res, next){
  res.render('index', { mode: 'products' });
});
