import { Router } from 'express';
import { SignInController } from './Controllers/SignInController';
import { UserController } from './Controllers/UserController';
import { AuthMiddleware } from './Middleware/AuthMiddleware';

const router = Router();
const userController = new UserController();
const signInController = new SignInController();
const middleware = new AuthMiddleware();

router.post('/register', userController.store);
router.post('/signIn', signInController.store);

export { router };
