var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: {unique: true, type: String, require: true},
  discontinued:   { type: Boolean, default: false },
  numberInStock:  { type: Number, default: 0 },
  description:    { type: String, required: true }
});

var Product = mongoose.model('product', productSchema); 

var _conn;
module.exports = {
  connect: function(){
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
  },
  models: {
    Product: Product
  }
};
