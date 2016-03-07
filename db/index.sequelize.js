    var Sequelize = require('sequelize');
    var db = new Sequelize(process.env.CONN || 'sqlite:nwind.db');

    var productSchema = {
      name: {unique: true, type: Sequelize.STRING, required: true},
      discontinued:   { type: Sequelize.BOOLEAN, defaultValue: false },
      numberInStock:  { type: Sequelize.INTEGER, defaultValue: 0 },
      description:    { type: Sequelize.STRING, required: true }
    };

    var Product = db.define('product', productSchema, {
      classMethods: {
        getAll : function(filter){
          filter = filter || {};
          var where = { where: filter };
          return this.findAll(where);
        },
        removeById : function(id){
          return this.destroy({ where: { id: id }});
        }
      }
    }); 

    var _conn;

    function connect(){
        if(_conn)
          return _conn;
        _conn = db.authenticate(); 
        return _conn;
      }

      function seed(){
        var products = {};
        return connect()
          .then(function(){
            return db.sync({ force: true });
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
