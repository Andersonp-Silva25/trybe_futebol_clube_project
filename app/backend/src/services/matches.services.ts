import MatchesModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import IMatch from '../interfaces/IMatch';

export default class MatchesService {
  private _model;
  private _teamModel;

  constructor() {
    this._model = MatchesModel;
    this._teamModel = TeamModel;
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
    const { homeTeamId, awayTeamId } = values;
    const homeTeam = await this._teamModel.findOne({ where: { id: homeTeamId } });
    const awayTeam = await this._teamModel.findOne({ where: { id: awayTeamId } });

    if (!awayTeam || !homeTeam) {
      return { type: 404, message: 'There is no team with such id!' };
    }
    const newMatch = {
      ...values,
      inProgress: 'true',
    };
    const result = await this._model.create(newMatch);
    return { type: null, message: result };
  }

  public async updateMatchStatus(id: string) {
    await this._model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  public async updateMatchInProgress(id: string, homeTeam: number, awayTeam: number) {
    await this._model.update({
      homeTeamGoals: homeTeam,
      awayTeamGoals: awayTeam,
    }, { where: { id } });

    const result = await this._model.findByPk(id);
    return { message: result };
  }
}
