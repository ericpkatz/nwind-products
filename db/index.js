//if connection string is mongoose
if(process.env.CONN.indexOf('mongodb') === 0){
  var mongoose = require('mongoose');

  var productSchema = mongoose.Schema({
    name: {unique: true, type: String, require: true},
    discontinued:   { type: Boolean, default: false },
    numberInStock:  { type: Number, default: 0 },
    description:    { type: String, required: true }
  });

  var Product = mongoose.model('product', productSchema); 

  var _conn;

  function connect(){
      if(_conn)
        return _conn;
      _conn = new Promise(function(resolve, reject){
        mongoose.connect(process.env.CONN || 'mongodb://localhost/nwind', function(err){
            if(err)
              return reject(err);
            resolve(mongoose.connection);
        });
      });
      return _conn;
    }

    function seed(){
      var products = {};
      return connect()
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
    }
  }
  else {
  
  }

module.exports = {
  connect: connect,
  models: {
    Product: Product
  },
  seed: seed 
}
