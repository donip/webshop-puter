const chai = require('chai');
const {
  expect,
} = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
/**
 * statistics.controller összevont unit teszt
 */
describe('statistics.controller functions', () => {
  describe('getProducts()', () => {
    it('response statusCode equal to 200 and object in res', (done) => {
      chai.request('http://localhost:8080/product')
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('getUsers()', () => {
    it('response statusCode equal to 200 & object in res', (done) => {
      chai.request('http://localhost:8080/useradmin')
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('getOrders()', () => {
    it('response statusCode equal to 200 and object in res', (done) => {
      chai.request('http://localhost:8080/order')
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
});

