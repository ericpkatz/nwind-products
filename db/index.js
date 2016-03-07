//if connection string is mongoose
if(process.env.CONN.indexOf('mongodb') === 0){
    module.exports = require('./index.mongoose');
}
else {
    module.exports = require('./index.sequelize');
  /*
    console.log('Hit Me');
    var Sequelize = require('sequelize');
    var db = new Sequelize(process.env.CONN || 'sqlite:nwind.db');
    console.log('DB', db);

    var productSchema = {
      name: {unique: true, type: Sequelize.STRING, required: true},
      discontinued:   { type: Sequelize.BOOLEAN, defaultValue: false },
      numberInStock:  { type: Sequelize.INTEGER, defaultValue: 0 },
      description:    { type: Sequelize.STRING, required: true }
    };

    var Product = db.define('product', productSchema); 

    var _conn;

    function connect(){
      console.log(Sequelize);
        if(_conn)
          return _conn;
        if(!db)
          db = new Sequelize(process.env.CONN || 'sqlite:nwind.db');
        console.log('CONN', db);
        _conn = db.authenticate(); 
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
  module.exports = {
    connect: connect,
    models: {
      Product: Product
    },
    seed: seed 
  }
  */
}

