const chai = require('chai');
const {
  expect,
} = require('chai');
const chaiHttp = require('chai-http');
const baseUrl = 'http://localhost:8080/useradmin';
chai.use(chaiHttp);
//const useradmin = require('../controller/useradmin.controller');

/**
 * useradmin.controller összevont unit teszt
 * @todo debug test of editUser, removeUser
 */
describe('useradmin.controller functions', () => {
  describe('listUsers()', () => {
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
  describe('editUser()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .put('/5afab001e8a028273ccecb24')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
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
});
