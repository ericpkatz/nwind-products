var db = require('../db');
var Product = db.models.Product;


module.exports = function(){
  var products = {};
  return db.connect()
    .then(function(){
      return Product.remove({});
    })
    .then(function(){
      return Product.create({ name: 'foo', description: 'foo description', discontinued: true });
    })
    .then(function(foo){
      products.foo = foo;
      return Product.create({ name: 'bar', description: 'bar description', numberInStock: 7 });
    })
    .then(function(bar){
      products.bar = bar;
      return Product.create({ name: 'bazz', description: 'bazz description' });
    })
    .then(function(bazz){
      products.bazz = bazz;
      return products;
    });

};
