import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const router = Router();
const login = new LoginController();

router.post('/', login.LoginUser);

export default router;
