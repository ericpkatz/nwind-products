var expect = require('chai').expect;
var db = require('../db');
var Product = db.models.Product;

describe('Product', function(){
  beforeEach(function(done){
    db.seed()
      .then(function(){
        done();
      }, done);
  
  });

  it('exists', function(){
    expect(Product).to.be.ok;
  });

  it('there are three products', function(done){
    Product.getAll()
      .then(function(products){
        expect(products.length).to.equal(3);
        done();
      });
  });
});
