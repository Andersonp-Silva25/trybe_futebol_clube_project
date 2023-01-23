import { Router } from 'express';
import validateLogin from '../middleware/validateLogin';
import LoginController from '../controllers/login.controller';

const router = Router();
const login = new LoginController();

router.post('/', validateLogin, login.LoginUser);

export default router;
