import { DataTypes, Model } from 'sequelize';
import connection from './index';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize: connection, tableName: 'teams', timestamps: false, underscored: true });

export default Teams;
