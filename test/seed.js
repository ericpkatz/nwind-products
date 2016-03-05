process.env.CONN = 'mongodb://localhost/nwind-test';
var db = require('../db');
var Product = db.models.Product;


module.exports = function(){
  return db.connect()
    .then(function(){
      return Product.remove({});
    })
    .then(function(){
      return Product.create({ name: 'foo', discontinued: true });
    })
    .then(function(){
      return Product.create({ name: 'bar', numberInStock: 7 });
    })
    .then(function(){
      return Product.create({ name: 'bazz' });
    });

};
