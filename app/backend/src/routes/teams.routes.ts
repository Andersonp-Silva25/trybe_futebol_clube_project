import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const router = Router();
const teams = new TeamController();

router.get('/', teams.getTeams);
router.get('/:id', teams.getTeamsById);

export default router;
