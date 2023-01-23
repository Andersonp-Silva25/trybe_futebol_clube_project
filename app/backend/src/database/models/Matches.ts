import { DataTypes, Model } from 'sequelize';
import connection from './index';
import Teams from './Teams';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamsGoals: number;
  declare inProgress: boolean;
}

Matches.init({
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
  awayTeamsGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, { sequelize: connection, tableName: 'matches', timestamps: false, underscored: true });

Teams.belongsTo(Matches, { foreignKey: 'homeTeamId', as: 'id' });
Teams.belongsTo(Matches, { foreignKey: 'awayTeamId', as: 'id' });
Matches.hasMany(Teams, { foreignKey: 'homeTeamId', as: 'id' });
Matches.hasMany(Teams, { foreignKey: 'awayTeamId', as: 'id' });

export default Matches;
