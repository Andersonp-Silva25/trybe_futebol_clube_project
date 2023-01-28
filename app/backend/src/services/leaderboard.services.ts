import models from '../database/models';
import { leaderboardHome, leaderboardAway } from '../utils/leaderboardQuery';

export default class LeaderboardService {
  private _model;

  constructor() {
    this._model = models;
  }

  public async getLeaderBoardHome() {
    const [result] = await this._model.query(leaderboardHome);

    return { message: result };
  }

  public async getLeaderBoardAway() {
    const [result] = await this._model.query(leaderboardAway);

    return { message: result };
  }
}
