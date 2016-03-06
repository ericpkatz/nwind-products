var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');
swig.setDefaults({cache: false});

var app = express();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

module.exports = app;

var pages = [
  { text: 'Home', mode: 'home', url: '/'},
  { text: 'Products', mode: 'products', url: '/products'}
];

app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next){
  res.locals.pages = pages;
  next();
});


app.get('/', function(req, res, next){
  res.render('index', { mode: 'home', title: 'Home' });
});

app.use('/products', require('./routes/products'));

