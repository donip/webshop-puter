const chai = require('chai');
const {
  expect,
} = require('chai');
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/product';
chai.use(chaiHttp);

/**
* product.controller összevont unit teszt
*/
describe('product.controller functions', () => {
  describe('getAll()', () => {
    it('response statusCode equal to 200 and object in res', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('find()', () => {
    it('response statusCode equal to 200 and object in res', (done) => {
      chai.request(baseUrl)
        .get('/5afad826c4a42f0de8412316')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('findByUrl()', () => {
    it('response statusCode equal to 200 and object in res', (done) => {
      chai.request(baseUrl)
        .get('/url/cheap-blender')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('create()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .post('/')
        .send({
          productname: 'Bogi', brand: 'bogi', price: 'Bogi', category: 'kat',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('update()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .put('/termeek')
        .send({
          productname: 'Bogi', brand: 'bogi', price: 'Bogi', category: 'kat',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('remove()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .delete('/termeek')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
