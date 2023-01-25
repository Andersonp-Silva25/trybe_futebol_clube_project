import TeamModel from '../database/models/Team';

export default class TeamService {
  private _model;

  constructor() {
    this._model = TeamModel;
  }

  public async getTeams() {
    const result = await this._model.findAll();
    if (!result) return { type: 404, message: 'Not Found' };
    return { type: null, message: result };
  }
}
