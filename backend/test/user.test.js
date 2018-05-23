const chai = require('chai');
const {
  expect,
} = require('chai');
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user';

chai.use(chaiHttp);
/**
 * user.controller összevont unit teszt
 */
describe('user.controller functions', () => {
  describe('profile()', () => {
    it('response statusCode equal to 200 & object in res', (done) => {
      chai.request(baseUrl)
        .get('/profile')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('login()', () => {
    it('auth. login: response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .post('/login')
        .send({ username: 'Peter@gmail.com', password: 'qwertz123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('unauth. login: response statusCode equal to 401', (done) => {
      chai.request(baseUrl)
        .post('/login')
        .send({ username: 'Peter@gmail.com', password: 'oldPw' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('register()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .post('/register')
        .send({ username: 'Bogi', email: 'Bogi@gmail.com', password: 'Bogi' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('logout()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/logout')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

