import { Router } from 'express';
import validateLogin from '../middleware/validateLogin';
import validateToken from '../middleware/validateToken';
import LoginController from '../controllers/login.controller';

const router = Router();
const login = new LoginController();

router.post('/', validateLogin, login.LoginUser);
router.get('/validate', validateToken, login.getRole);

export default router;
