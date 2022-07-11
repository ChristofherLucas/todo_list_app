import { DataTypes } from 'sequelize';
import { DB } from 'src/config/DB';
import { WorkspaceDTO } from 'src/Interfaces/@DTO/WorkspaceDTO';
import { IModel } from 'src/Interfaces/@Models/IModel';
import { User } from './User';

const Workspace: IModel<WorkspaceDTO> = DB.define('workspaces', {
  workspace_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  workspace_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Workspace.belongsTo(User, {
  constraints: true,
  foreignKey: {
    name: 'fk_user_id',
    allowNull: false
  }
});

export { Workspace };
