import { Router } from 'express';
import { userController } from '../controller/user.js';

export const userRouter = Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);

