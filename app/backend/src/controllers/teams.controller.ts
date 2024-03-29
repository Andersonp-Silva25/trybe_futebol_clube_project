import { Request, Response } from 'express';
import TeamService from '../services/teams.services';

export default class TeamController {
  private _teamController;

  constructor() {
    this._teamController = new TeamService();
  }

  public getTeams = async (_req: Request, res: Response) => {
    try {
      const { type, message } = await this._teamController.getTeams();
      if (type) return res.status(type).json({ message });
      return res.status(200).json(message);
    } catch (error) {
      console.log(error);
    }
  };

  public getTeamsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { type, message } = await this._teamController.getTeamsById(id);
      if (type) return res.status(type).json({ message });
      return res.status(200).json(message);
    } catch (error) {
      console.log(error);
    }
  };
}
