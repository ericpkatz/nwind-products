var app = require('express').Router();
var Product = require('../db').models.Product;

module.exports = app;

app.use(function(req, res, next){
  res.locals.panelClass = function(product){
    if(product.discontinued)
      return 'discontinued';
    else
      return '';
  };

  res.locals.getDeleteAction = function(title, product){
    if(title === 'Products')
      return `/products/${product.id}`;
    return `/products/active/${product.id}`;
  };

  res.locals.getEditAction = function(title, product){
    if(title === 'Products')
      return `/products/${product.id}`;
    return `/products/active/${product.id}`;
  };

  res.locals.getInsertAction = function(title){
    if(title === 'Products')
      return `/products/`;
    return `/products/active`;
  };

  res.locals.getDetailLink = function(title, product, selected){
    if(title === 'Products'){
      if(product === selected)
        return '/products';
      else
        return `/products/${product.name}`;
    }
    if(product === selected)
      return '/products/active';
    else
      return `/products/active/${product.name}`;
  };

  next();
});


function deleteRoute(redirectTo){
  return function(req, res, next){
    Product.remove({ _id: req.params.id })
      .then(function(product){
        res.redirect(redirectTo);
      }, next);
  };
}

function updateRoute(redirectTo){
  return function(req, res, next){
    Product.findById(req.params.id)
      .then(function(product){
        if(req.body.discontinued !== undefined)
          product.discontinued = req.body.discontinued;
        if(req.body.numberInStock !== undefined)
          product.numberInStock = req.body.numberInStock;
        return product.save();
      })
      .then(function(){
        res.redirect(redirectTo);
      }, next);
  };
}

function createRoute(redirectTo){
  return function(req, res, next){
    Product.create(req.body)
      .then(function(product){
        res.redirect(redirectTo);
      }, next);
  };

}

function listRoute(filter, title){
  return function(req, res, next){
    Product.find(filter)
      .then(function(products){
        res.render('products', { title: title, mode: 'products', products: products });
      }, next);
      
  };

}

function detailRoute(filter, title){
  return function(req, res, next){
    Product.find(filter)
      .then(function(products){
        var selected = products.filter(function(product){
          return product.name == req.params.name;
        })[0]; 
        res.render('products', { title: title, mode: 'products', products: products, selected: selected });
      }, next);
  };
}
app.delete('/:id', deleteRoute('/products')); 

app.delete('/active/:id', deleteRoute('/products/active'));

app.put('/:id', updateRoute('/products')); 

app.put('/active/:id', updateRoute('/products/active')); 

app.post('/', createRoute('/products')); 

app.post('/active', createRoute('/products/active'));

app.get('/', listRoute({}, 'Products'));

app.get('/active', listRoute({ discontinued: false }, 'Active Products'));


app.get('/active/:name', detailRoute({ discontinued: false }, 'Active Products')); 

app.get('/:name', detailRoute({}, 'Products')); 
