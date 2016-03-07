var app = require('express').Router();
var Product = require('../db').models.Product;

module.exports = app;

function update(id, body){
  return Product.findById(id)
    .then(function(product){
      if(body.discontinued !== undefined)
        product.discontinued = body.discontinued;
      if(body.numberInStock !== undefined)
        product.numberInStock = body.numberInStock;
      return product.save();
    });
}

function getSelected(products, name){
  return products.filter(function(product){
    return product.name === name;
  })[0];
}

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
  update(req.params.id, req.body)
    .then(function(product){
      res.redirect('/products');
    }, next);
});

app.put('/active/:id', function(req, res, next){
  update(req.params.id, req.body)
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
      var selected = getSelected(products, req.params.name);
      res.render('products', { title: 'Active Products', mode: 'products', products: products, selected: selected });
    });
});

app.get('/:name', function(req, res, next){
  Product.find()
    .then(function(products){
      var selected = getSelected(products, req.params.name);
      res.render('products', { title: 'Products', mode: 'products', products: products, selected: selected });
    });
});
