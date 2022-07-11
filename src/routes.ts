import { Router, Request, Response } from 'express';
import { app } from './app';
import { UserController } from './Controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/register', userController.store);

export { router };
