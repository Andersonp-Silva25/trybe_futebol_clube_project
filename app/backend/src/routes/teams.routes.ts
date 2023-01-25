import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const router = Router();
const teams = new TeamController();

router.get('/', teams.getTeams);

export default router;
