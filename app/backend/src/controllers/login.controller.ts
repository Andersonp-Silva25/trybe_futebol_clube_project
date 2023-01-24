import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import UserService from '../services/login.services';
import JWT from '../utils/jwtFunctions';

export default class Login {
  private _userService;
  private _jwt;

  constructor() {
    this._userService = new UserService();
    this._jwt = new JWT();
  }

  public LoginUser = async (req: Request, res: Response) => {
    try {
      const login = req.body;
      const { type, message } = await this._userService.login(login);

      if (type) return res.status(type).json({ message });

      return res.status(200).json({ token: message });
    } catch (error) {
      console.log(error);
    }
  };

  public getRole = async (req: Request, res: Response) => {
    const { authorization: token } = req.headers;
    const decodeToken = this._jwt.decodeToken(token as string);
    const role = await this._userService.getRole(decodeToken as IUser);

    return res.status(200).json({ role: role.message });
  };
}
