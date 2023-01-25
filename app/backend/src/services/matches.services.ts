import MatchesModel from '../database/models/Match';
import TeamModel from '../database/models/Team';

export default class MatchesService {
  private _model;

  constructor() {
    this._model = MatchesModel;
  }

  public async getMatches() {
    const result = await this._model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!result) return { type: 404, message: 'Not Found' };
    return { type: null, message: result };
  }
}
