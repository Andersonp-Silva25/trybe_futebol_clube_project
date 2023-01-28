import models from '../database/models';
import leaderboardHome from '../utils/leaderboardHome';

export default class LeaderboardService {
  private _model;

  constructor() {
    this._model = models;
  }

  public async getLeaderBoardHome() {
    const [result] = await this._model.query(leaderboardHome);

    return { message: result };
  }
}
