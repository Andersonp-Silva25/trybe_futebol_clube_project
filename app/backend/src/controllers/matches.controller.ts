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

  public createMatch = async (req: Request, res: Response) => {
    try {
      const values = req.body;
      const { type, message } = await this._matchesController.createMatch(values);
      if (type) return res.status(type).json({ message });
      return res.status(201).json(message);
    } catch (error) {
      console.log((error));
    }
  };

  public updateMatchStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { message } = await this._matchesController.updateMatchStatus(id);
      return res.status(200).json({ message });
    } catch (error) {
      console.log(error);
    }
  };

  public updateMatchInProgress = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { message } = await this._matchesController
        .updateMatchInProgress(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json(message);
    } catch (error) {
      console.log(error);
    }
  };
}
