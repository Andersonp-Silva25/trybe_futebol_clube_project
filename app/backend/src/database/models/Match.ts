import { DataTypes, Model } from 'sequelize';
import connection from './index';
import Teams from './Team';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, { sequelize: connection, tableName: 'matches', timestamps: false, underscored: true });

Teams.belongsTo(Match, { foreignKey: 'homeTeamId', as: 'id' });
Teams.belongsTo(Match, { foreignKey: 'awayTeamId', as: 'id' });
Match.hasMany(Teams, { foreignKey: 'homeTeamId', as: 'id' });
Match.hasMany(Teams, { foreignKey: 'awayTeamId', as: 'id' });

export default Match;
