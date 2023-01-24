import * as jwt from 'jsonwebtoken';

export default class JWT {
  private _secret: jwt.Secret;
  private _config: jwt.SignOptions;
  private _token: string;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'HakunaMatata';
    this._config = {
      algorithm: 'HS256',
      expiresIn: '15min',
    };
    this._token = '';
  }

  public createToken(email: string) {
    const token = jwt.sign({ email }, this._secret, this._config);

    return token;
  }

  public decodeToken(token: string) {
    this._token = token;
    const decode = jwt.decode(this._token);
    return decode;
  }
}
