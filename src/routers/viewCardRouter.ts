import { Router } from 'express';
import viewCard from '../controllers/viewCardController';

const router = Router();
router.get('/card:id', viewCard);
export default router;