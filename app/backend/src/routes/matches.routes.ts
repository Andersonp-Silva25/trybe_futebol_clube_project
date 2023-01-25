import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const router = Router();
const matches = new MatchesController();

router.get('/', matches.getAllMatches);

export default router;
