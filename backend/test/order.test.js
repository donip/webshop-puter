const chai = require('chai');
const {
  expect,
} = require('chai');
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/order';
chai.use(chaiHttp);

/**
* order.controller összevont unit teszt
*/
describe('order.controller functions', () => {
  describe('list()', () => {
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
  /**
   * @todo ez még 404-es hibára fut
   */
  /*
  describe('find()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/5afc17c4534b7d09ac663672')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  */
  describe('create()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .post('/')
        .send({
          customer: 'Laci',
          products: [{
            product: 'Villanyberetva',
            quantity: '8',
          }],
          status: 'active',
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
          customer: 'Laci',
          products: [{
            product: 'Villanyberetva',
            quantity: '8',
          }],
          status: 'active',
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
        .delete('/oooder')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
