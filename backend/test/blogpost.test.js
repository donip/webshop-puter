const chai = require('chai');
const {
  expect,
} = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/blogpost';
chai.use(chaiHttp);

// Simple Base Examples
describe('Blogpost', () => {
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
