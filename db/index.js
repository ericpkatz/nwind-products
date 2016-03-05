//how to make config determine the model?
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: String,
  discontinued:   { type: Boolean, default: false },
  numberInStock:  { type: Number, default: 0 },
  description:    { type: String }
});

var Product = mongoose.model('product', productSchema); 

var _conn;
module.exports = {
  connect: function(){
    if(_conn)
      return _conn;
    _conn = new Promise(function(resolve, reject){
      mongoose.connect(process.env.CONN, function(err){
          if(err)
            return reject(err);
          resolve(mongoose.connection);
      });
    });
    return _conn;
  },
  models: {
    Product: Product
  }
};
