import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default class MatchesController {
  private _matchesController;

  constructor() {
    this._matchesController = new MatchesService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const isActive = inProgress === 'true';
        const { type, message } = await this._matchesController
          .getMatchesActivesOrFinished(isActive as boolean);

        if (type) return res.status(type).json({ message });
        return res.status(200).json(message);
      }

      const { type, message } = await this._matchesController.getMatches();
      if (type) return res.status(type).json({ message });
      return res.status(200).json(message);
    } catch (error) {
      console.log(error);
    }
  };
}