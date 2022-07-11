import express from 'express';
import { router as userRoutes } from './routes/UserRoutes';
import { router as workspaceRoutes } from './routes/WorkspaceRoutes';
import { DB } from './config/DB';

const app = express();

app.use(express.json());

(async () => {
  try {
    await DB.authenticate(); // conecta no banco
    // await DB.sync({ force: true }); // sincroniza o banco com os models (cria as tabelas)
    app.emit('db connected');
  } catch (error) {
    console.log('Failed to connect database');
    console.error(error);
  }
})();

app.use('/api', userRoutes);
app.use('/api', workspaceRoutes);
export { app };
