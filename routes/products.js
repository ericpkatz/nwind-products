var app = require('express').Router();
var Product = require('../db').models.Product;

module.exports = app;

app.post('/', function(req, res, next){
  Product.create(req.body)
    .then(function(product){
      res.redirect('/products');
    }, next);
});

app.delete('/:id', function(req, res, next){
  Product.remove({ _id: req.params.id })
    .then(function(product){
      res.redirect('/products');
    }, next);
});

app.delete('/active/:id', function(req, res, next){
  Product.remove({ _id: req.params.id })
    .then(function(product){
      res.redirect('/products/active');
    }, next);
});

app.put('/:id', function(req, res, next){
  Product.findById(req.params.id)
    .then(function(product){
      if(req.body.discontinued !== undefined)
        product.discontinued = req.body.discontinued;
      if(req.body.numberInStock !== undefined)
        product.numberInStock = req.body.numberInStock;
      return product.save();
    })
    .then(function(product){
      res.redirect('/products');
    }, next);
});

app.put('/active/:id', function(req, res, next){
  Product.findById(req.params.id)
    .then(function(product){
      if(req.body.discontinued !== undefined)
        product.discontinued = req.body.discontinued;
      if(req.body.numberInStock !== undefined)
        product.numberInStock = req.body.numberInStock;
      return product.save();
    })
    .then(function(product){
      res.redirect('/products/active');
    }, next);
});

app.post('/active', function(req, res, next){
  Product.create(req.body)
    .then(function(product){
      res.redirect('/products/active');
    }, next);
});

app.get('/', function(req, res, next){
  Product.find()
    .then(function(products){
      res.render('products', { title: 'Products', mode: 'products', products: products });
    });
});


app.get('/active', function(req, res, next){
  Product.find({ discontinued: false })
    .then(function(products){
      res.render('products', { title: 'Active Products', mode: 'products', products: products });
    });
});

app.get('/active/:name', function(req, res, next){
  Product.find({ discontinued: false })
    .then(function(products){
      var selected = products.filter(function(product){
        return product.name === req.params.name;
      })[0];
      res.render('products', { title: 'Active Products', mode: 'products', products: products, selected: selected });
    });
});

app.get('/:name', function(req, res, next){
  Product.find()
    .then(function(products){
      var selected = products.filter(function(product){
        return product.name === req.params.name;
      })[0];
      res.render('products', { title: 'Products', mode: 'products', products: products, selected: selected });
    });
});
