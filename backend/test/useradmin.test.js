const chai = require('chai');
const {
  expect,
} = require('chai');
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/useradmin';
chai.use(chaiHttp);

let cookie;

/**
* useradmin.controller összevont unit teszt
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

  /* admin jogosultsággal futtatható fv-ek tesztelése, ahol
     most nincs böngésző ami 'megjegyezze' a bejelentkezett admint,
     így manuálisan kell a http headerből a cookie-t hozzácsapni a fv-hez
  */
  before((done) => {
    chai.request('http://localhost:8080/user')
      .post('/login')
      .send({
        username: 'testAdmin@gmail.com',
        password: '1234',
      })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        cookie = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });

  describe('editUser()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .put('/5afab001e8a028273ccecb24')
        // A sütit visszaküldjük minden kérésnél, ahol kell a user azonosítása
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('removeUser()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .delete('/5afb311edfdd372d041dda96')
        // A sütit visszaküldjük minden kérésnél, ahol kell a user azonosítása
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
