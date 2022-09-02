import { Router } from 'express';
import payment from '../controllers/paymentController';
import schemaValidation from '../middlewares/schemaValidation';
import paymentSchema from '../schemas/paymentSchema';

const paymentRouter = Router();
paymentRouter.post('/payment', schemaValidation(paymentSchema), payment);
export default paymentRouter;