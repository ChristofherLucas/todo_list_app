import { Router } from 'express';
import { WorkspaceController } from 'src/Controllers/WorkspaceController';
import { AuthMiddleware } from 'src/Middleware/AuthMiddleware';

const router = Router();
const controller = new WorkspaceController();
const middleware = new AuthMiddleware();

router.post('/workspace/create', middleware.tokenVerify, controller.store);

router.get('/workspaces', middleware.tokenVerify, controller.index);

router.get('/workspace/:name', middleware.tokenVerify, controller.show);

router.delete(
  '/workspace/delete/:name',
  middleware.tokenVerify,
  controller.destroy
);

router.put(
  '/workspace/update/:name',
  middleware.tokenVerify,
  controller.update
);

export { router };
