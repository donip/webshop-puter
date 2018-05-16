const chai = require('chai');
const {
  expect,
} = require('chai');
const chaiHttp = require('chai-http');
const baseUrl = 'http://localhost:8080/product';
chai.use(chaiHttp);
const theAccount = {
  username: 'testAdmin@gmail.com',
  password: '1234',
};

let cookie;
/**
* useradmin.controller összevont unit teszt
* @todo debug test of editUser, removeUser
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
/*
  describe('create()', () => {
    // Login során kapunk egy sütit a http headerbe, ezt lementjük a süti változóba
    // Ez azért kell mert minden kérésnél, amihez szükséges a belépett user,
    // el kell küldeni a kapott sütit is. Hiszen ez azonosítja a usert
    // Itt nincs böngésző ami lementse, így manuálisan kell
    before((done) => {
      chai.request('http://localhost:8080/user')
        .post('/login')
        .send(theAccount)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          cookie = res.headers['set-cookie'].pop().split(';')[0];
          done();
        });
    });
    
    
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .put('/5afab001e8a028273ccecb24')
        // A sütit visszaküldjük minden kérésnél, ahol kell a user azonosítása
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          console.log(cookie);
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
  */
});
