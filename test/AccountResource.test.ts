import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import Server from '../src/Server';
import { Account } from '../src/models/account';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
let expect: Chai.ExpectStatic = chai.expect;

describe('GET api/v1/accounts', () => {
  it('should include jonas@gmail.com', () => {
    return chai.request(Server).get('/api/v1/accounts')
      .then(res => {
        expect(res).to.have.status(200);
        let jonas: Account = res.body.find(account => account.email === 'jonas@gmail.com');
        expect(jonas).to.exist;
        expect(jonas).to.have.all.keys([
          'id',
          'email'
        ]);
      });
  });
});

describe('GET api/v1/accounts/:accountId', () => {
  it('should return amanda@gmail.com', () => {
    return chai.request(Server).get('/api/v1/accounts/id3')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.id).to.equal('id3');
        expect(res.body.email).to.equal('amanda@gmail.com');
      });
  });
});

describe('POST api/v1/accounts/', () => {

  it('should add bob@gmail.com and return with 200', () => {
    return chai.request(Server).post('/api/v1/accounts/')
      .send(new Account('id5', 'bob@gmail.com'))
      .then(res => {
        expect(res).to.have.status(200);
      });
  });
});

describe('PUT api/v1/accounts/', () => {

  it('should update bob to bob2 and respond with 200', () => {
    return chai.request(Server).put('/api/v1/accounts/')
      .send(new Account('id5', 'bob2@gmail.com'))
      .then(res => {
        expect(res).to.have.status(200);
      });
  });
});

describe('DELETE api/v1/accounts/:accountId', () => {

  it('should delete bob2@gmail.com and respond with 200', () => {
    return chai.request(Server).del('/api/v1/accounts/id5')
      .then(res => {
        expect(res).to.have.status(200);
      });
  });
});