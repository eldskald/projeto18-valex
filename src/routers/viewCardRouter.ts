import { Router } from 'express';
import viewCard from '../controllers/viewCardController';

const viewCardRouter = Router();
viewCardRouter.get('/card/:id', viewCard);
export default viewCardRouter;