import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { adminUser, commonUser, emptyUser, invalidUser, token } from './mock/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando Login', () => {

  it('Verifica se o login teve sucesso', async () => {
    const response = await chai 
      .request(app)
      .post('/login')
      .send(adminUser);

    expect(response.status).to.have.equal(200);
  });

  it('Verifica se é retornado um token ao logar com sucesso', async () => {
    const response = await chai 
      .request(app)
      .post('/login')
      .send(commonUser);

    expect(response.body).to.have.property('token');
  });

  it('Verifica se ocorre um erro ao logar com email invalido', async () => {
    const response = await chai 
      .request(app)
      .post('/login')
      .send(invalidUser);

    expect(response.status).to.have.equal(401);
    expect(response.body).to.deep.equal({message: 'Incorrect email or password'});
  });

  it('Verifica se ocorre um erro ao logar com campos vazios', async () => {
    const response = await chai 
      .request(app)
      .post('/login')
      .send(emptyUser);

    expect(response.status).to.have.equal(400);
    expect(response.body).to.deep.equal({message: 'All fields must be filled'});
  });

  it('Verifica se o token gerado é valido', async () => {
    const response = await chai 
      .request(app)
      .get('/login/validate')
      .set('authorization', token);

    expect(response.status).to.be.equal(200);
  });

  it('Verifica se o token é invalido', async () => {
    const response = await chai 
      .request(app)
      .get('/login/validate')
      .set('authorization', 'Token Invalido');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({message: 'Token must be a valid token'});
  });

});
