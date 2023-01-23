import { Request, Response } from 'express';
import UserService from '../services/login.services';

export default class Login {
  private _userService;

  constructor() {
    this._userService = new UserService();
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
}
