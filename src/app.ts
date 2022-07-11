import express from 'express';
import { router } from './routes';
import { DB } from './config/DB';

const app = express();

app.use(express.json());

(async () => {
  try {
    await DB.authenticate(); // conecta no banco
    // await DB.sync(); // sincroniza o banco com os models (cria as tabelas)
    app.emit('db connected');
  } catch (error) {
    console.log('Failed to connect database');
    console.error(error);
  }
})();

app.use('/api', router);

export { app };
