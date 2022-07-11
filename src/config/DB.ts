import { Sequelize } from 'sequelize';

export const DB = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '23022005',
  database: 'todo_list_app'
});
