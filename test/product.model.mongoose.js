var expect = require('chai').expect;
var db = require('../db');
var Product = db.models.Product;
var seed = require('./seed');

describe('Product', function(){
  beforeEach(function(done){
    seed()
      .then(function(){
        done();
      }, done);
  
  });

  it('exists', function(){
    expect(Product).to.be.ok;
  });

  it('there are three products', function(done){
    Product.find()
      .then(function(products){
        expect(products.length).to.equal(3);
        done();
      });
  });
});
