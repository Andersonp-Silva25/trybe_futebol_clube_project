import MatchesModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import IMatch from '../interfaces/IMatch';

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

  public async getMatchesActivesOrFinished(inProgress: boolean) {
    const result = await this._model.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!result) return { type: 404, message: 'Not Found' };
    return { type: null, message: result };
  }

  public async createMatch(values: IMatch) {
    const newMatch = {
      ...values,
      inProgress: 'true',
    };
    const result = await this._model.create(newMatch);
    if (!result) return { type: 400, message: 'Bad Request' };
    return { type: null, message: result };
  }
}
