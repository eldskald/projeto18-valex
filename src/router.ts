import { Router } from 'express';
import createCardRouter from './routers/createCardRouter';
import activateCardRouter from './routers/activateCardRouter';
import viewCardRouter from './routers/viewCardRouter';
import blockUnblockCardRouter from './routers/blockUnblockCardRouter';
import rechargeRouter from './routers/rechargeRouter';
import paymentRouter from './routers/paymentRouter';

const router = Router();

router.use(createCardRouter);
router.use(activateCardRouter);
router.use(viewCardRouter);
router.use(blockUnblockCardRouter);
router.use(rechargeRouter);
router.use(paymentRouter);

export default router;