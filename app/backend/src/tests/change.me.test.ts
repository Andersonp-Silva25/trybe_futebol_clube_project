import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import UserModel from '../database/models/User'
import TeamModel from '../database/models/Team'
import MatchModel from '../database/models/Match'
import UserService from '../services/login.services'
import IUser from '../interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Verifica se instanciar as models de login', () => {
    const userModel = new UserModel();
    const teamModel = new TeamModel();
    const matchModel = new MatchModel();

    expect(userModel).to.be.instanceOf(UserModel);
    expect(teamModel).to.be.instanceOf(TeamModel);
    expect(matchModel).to.be.instanceOf(MatchModel);
  });

  it('Verifica se o login teve sucesso', async () => {
    const login: IUser = {email: 'admin@admin.com', password: '123456'}
    const response = await chai 
      .request(app)
      .post('/login')
      .send(login)

    expect(response.status).to.be.equal(200);
  })
});
