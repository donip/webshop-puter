const chai = require('chai');
const {
  expect,
} = require('chai');
const chaiHttp = require('chai-http');
const useradmin = require('../controller/useradmin.controller');
const baseUrl = 'http://localhost:8080/useradmin';
chai.use(chaiHttp);

// Simple Base Examples
describe('useradmin', () => {
  describe('listUsers()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  /*
  describe('removeUser()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .delete('/5afab001e8a028273ccecb24')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  */
});
