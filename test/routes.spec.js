var cheerio = require('cheerio');
var app = require('supertest')(require('../app'));
var expect = require('chai').expect;

describe('Routes', function(){
  describe('the Home Page', function(){
    it('the Home link is active', function(done){
      app.get('/')
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var li = $('a:contains("Home")').parent();
          expect(li.hasClass('active')).to.eq(true);
          done();
        });
    
    });
  });

  describe('the Products Page', function(){
    it('the Product link is active', function(done){
      app.get('/products')
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var li = $('a:contains("Products")').parent();
          expect(li.hasClass('active')).to.eq(true);
          done();
        });
    
    });
  });
});
