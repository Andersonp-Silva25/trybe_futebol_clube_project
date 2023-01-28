import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

export default class LeaderboardController {
  private _leaderboardService;

  constructor() {
    this._leaderboardService = new LeaderboardService();
  }

  public getLeaderboardHome = async (req: Request, res: Response) => {
    const { message } = await this._leaderboardService.getLeaderBoardHome();
    return res.status(200).json(message);
  };
}
