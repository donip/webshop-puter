const chai = require('chai');
const {
  expect,
} = require('chai');
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/useradmin';
chai.use(chaiHttp);
const superagent = require('superagent');

const request1 = require('supertest');

const agent = superagent.agent();
const theAccount = {
  username: 'testAdmin@gmail.com',
  password: '1234',
};
const login = function logTest(req, done) {
  request1('http://localhost:8080/user')
    .post('/login')
    .send(theAccount)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      agent.saveCookies(res);
      done(agent);
    });
};

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
    let agent1;
    before((done) => {
      login.logTest(request1, (loginAgent) => {
        agent1 = loginAgent;
        done();
      });
    });
    it('response statusCode equal to 200', (done) => {
      agent1.attachCookies(request1);
      chai.request(baseUrl)
        .delete('/5afb311edfdd372d041dda96')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
