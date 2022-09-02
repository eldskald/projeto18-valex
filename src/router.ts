import { Router } from 'express';
import createCardRouter from './routers/createCardRouter';
import activateCardRouter from './routers/activateCardRouter';
import viewCardRouter from './routers/viewCardRouter';

const router = Router();

router.use(createCardRouter);
router.use(activateCardRouter);
router.use(viewCardRouter);

export default router;