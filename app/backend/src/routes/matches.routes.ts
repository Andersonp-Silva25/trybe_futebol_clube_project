import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import validateToken from '../middleware/validateToken';
import validateTeams from '../middleware/validateMatches';

const router = Router();
const matches = new MatchesController();

router.post('/', validateToken, validateTeams, matches.createMatch);
router.patch('/:id/finish', matches.updateMatchStatus).bind(matches);
router.get('/', matches.getAllMatches);

export default router;
