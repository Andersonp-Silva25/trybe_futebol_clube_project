import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import UserModel from '../database/models/User';
import JWT from '../utils/jwtFunctions';
import validateEmail from '../utils/validateEmail';

export default class Login {
  private _model;
  private _jwt;

  constructor() {
    this._model = UserModel;
    this._jwt = new JWT();
  }

  public async login(user: IUser) {
    const { email, password } = user;
    const login = await this._model.findOne({ where: { email } });
    const emailValidate = validateEmail(email);

    if (!emailValidate || !login || !bcrypt.compareSync(password, login.password)) {
      return { type: 401, message: 'Incorrect email or password' };
    }

    const token = this._jwt.createToken(email);

    return { type: null, message: token };
  }
}
