process.env.CONN = 'mongodb://localhost/nwind-test';
var cheerio = require('cheerio');
var app = require('supertest')(require('../app'));
var expect = require('chai').expect;

describe('Routes', function(){
  var products;
  beforeEach(function(done){
    require('./seed')()
      .then(function(_products){
        products = _products;
        done();
      });
  
  });
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

    it('there are three products', function(done){
      app.get('/products')
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var products = $('div.product');
          expect(products.length).to.eq(3);
          var title = $('title');
          expect(title.text()).to.equal('Products');
          done();
        });
    });

    it('there is a link for active products', function(done){
      app.get('/products')
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var link = $('a:contains("Filter Active Products")');
          expect(link.length).to.eq(1);
          done();
        });
    });

    it('there should be links for product details', function(done){
      app.get('/products')
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var links = $(`a[href='/products/foo']`);
          expect(links.length).to.eq(1);
          done();
        });
    });
  });

  describe('Product details', function(){
    it('the product details are shown', function(done){
      var url = `/products/foo`;
      app.get(url)
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var description = $('div.detail:contains("foo description")');
          expect(description.length).to.eq(1);
          var link = $('a:contains("foo")');
          expect(link.attr('href')).to.eq('/products');
          done();
        });
    });
  });

  describe('Product details on active page', function(){
    it('the product details are shown', function(done){
      var url = `/products/active/bar`;
      app.get(url)
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var description = $('div.detail:contains("bar description")');
          expect(description.length).to.eq(1);
          var link = $('a:contains("bar")');
          expect(link.attr('href')).to.eq('/products/active');
          done();
        });
    });
  });

  describe('The active products page', function(){
    it('there are three products', function(done){
      app.get('/products/active')
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var products = $('div.product');
          expect(products.length).to.eq(2);
          done();
        });
    });

    it('there is a link for all products', function(done){
      app.get('/products/active')
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var link = $('a:contains("Show All Products")');
          expect(link.length).to.eq(1);
          done();
        });
    });
    it('there should be links for product details', function(done){
      app.get('/products/active')
        .end(function(err, res){
          var $ = cheerio.load(res.text);
          var links = $(`a[href='/products/active/bar']`);
          expect(links.length).to.eq(1);
          done();
        });
    });
  });
  describe('Adding a product', function(){
    it('A product can be created', function(done){
      app.post('/products')
        .send("name=fizz&description=buzz")
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          done();
        });
    });
  });
  describe('Adding a product on active page', function(){
    it('A product can be created', function(done){
      app.post('/products/active')
        .send("name=fizz&description=buzz")
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          done();
        });
    });
  });
  describe('Updating a product', function(){
    it('A product can be updated', function(done){
      app.put(`/products/${products.bar.id}`)
        .send("numberInStock=10&discontinued=true")
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          done();
        });
    });
  });
  describe('Updating a product from active page', function(){
    it('A product can be updated', function(done){
      app.put(`/products/active/${products.bar.id}`)
        .send("numberInStock=10&discontinued=true")
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          done();
        });
    });
  });
  describe('Deleting a product', function(){
    it('A product can be deleted', function(done){
      app.delete(`/products/${products.bar.id}`)
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          done();
        });
    });
  });
  describe('Deleting a product', function(){
    it('A product can be deleted', function(done){
      app.delete(`/products/active/${products.bar.id}`)
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          done();
        });
    });
  });
});
