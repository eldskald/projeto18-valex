import { Router } from 'express';
import createCardRouter from './routers/createCardRouter';
import activateCardRouter from './routers/activateCardRouter';
import viewCardRouter from './routers/viewCardRouter';
import blockUnblockCardRouter from './routers/blockUnblockCardRouter';
import rechargeRouter from './routers/rechargeRouter';

const router = Router();

router.use(createCardRouter);
router.use(activateCardRouter);
router.use(viewCardRouter);
router.use(blockUnblockCardRouter);
router.use(rechargeRouter);

export default router;