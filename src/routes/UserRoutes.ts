import { Router } from 'express';
import { SignInController } from 'src/Controllers/SignInController';
import { UserController } from 'src/Controllers/UserController';

const router = Router();
const userController = new UserController();
const signInController = new SignInController();

router.post('/register', userController.store);
router.post('/signIn', signInController.store);

export { router };
