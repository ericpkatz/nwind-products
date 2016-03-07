var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
swig.setDefaults({cache: false});

var app = express();
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/client', express.static(path.join(__dirname, 'client')));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

module.exports = app;

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

var pages = [
  { text: 'Home', mode: 'home', url: '/'},
  { text: 'Products', mode: 'products', url: '/products'}
];


app.use(function(req, res, next){
  res.locals.pages = pages;
  next();
});


app.get('/', function(req, res, next){
  res.render('index', { mode: 'home', title: 'Home' });
});

app.use('/products', require('./routes/products'));

app.use(function(err, req, res, next){
  console.log(err);
  res.status(500);
  res.render('index', { error: err, mode: 'home', title: 'Home' });
});

