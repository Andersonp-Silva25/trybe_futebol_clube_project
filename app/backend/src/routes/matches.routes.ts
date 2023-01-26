import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import validateToken from '../middleware/validateToken';

const router = Router();
const matches = new MatchesController();

router.get('/', matches.getAllMatches);
router.post('/', validateToken, matches.createMatch);

export default router;
