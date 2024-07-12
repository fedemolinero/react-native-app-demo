import { expect } from 'chai';
import supertest from 'supertest';
import app from '../server.js'; 

const request = supertest(app);

describe('Product Routes', () => {
  it('GET /api/products should return all products', (done) => {
    request
      .get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0); // check that there's at least one product
        done();
      });
  });

  it('GET /api/stock-price/:sku should return stock and price for a SKU', (done) => {
    const sku = '10167'; // existing SKU in file stock-price.js

    request
      .get(`/api/stock-price/${sku}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('stock');
        expect(res.body).to.have.property('price');
        done();
      });
  });

  it('GET /api/stock-price/:invalidSku should return 404 if SKU not found', (done) => {
    const invalidSku = '99999'; // SKU not found in stock-price.js

    request
      .get(`/api/stock-price/${invalidSku}`)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        
        // Verifiying that the response has message property with error
        expect(res.body).to.have.property('message', 'Product variant not found');
        done();
      });
  });
});
