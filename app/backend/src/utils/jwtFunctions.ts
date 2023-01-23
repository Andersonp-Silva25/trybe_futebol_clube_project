import * as jwt from 'jsonwebtoken';

export default class JWT {
  private _secret: jwt.Secret;
  private _config: jwt.SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'HakunaMatata';
    this._config = {
      algorithm: 'HS256',
      expiresIn: '15min',
    };
  }

  public createToken(email: string) {
    const token = jwt.sign({ email }, this._secret, this._config);

    return token;
  }
}
