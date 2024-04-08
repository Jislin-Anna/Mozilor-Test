import { Router } from 'express';
import { login, signup } from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.post('/login', login);
userRoutes.post('/signup', signup);

export default userRoutes;