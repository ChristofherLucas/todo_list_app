import { Router } from 'express';
import { WorkspaceController } from 'src/Controllers/WorkspaceController';
import { AuthMiddleware } from 'src/Middleware/AuthMiddleware';

const router = Router();
const controller = new WorkspaceController();
const middleware = new AuthMiddleware();

router.post('/workspace/create', middleware.tokenVerify, controller.store);

export { router };
