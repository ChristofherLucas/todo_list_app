import { DataTypes } from 'sequelize';
import { DB } from 'src/config/DB';
import { UserDTO } from 'src/Interfaces/@DTO/UserDTO';
import { IModel } from 'src/Interfaces/@Models/IModel';

const User: IModel<UserDTO> = DB.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export { User };
