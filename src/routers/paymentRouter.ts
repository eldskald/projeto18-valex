import { Router } from 'express';
import { payment, onlinePayment } from '../controllers/paymentController';
import schemaValidation from '../middlewares/schemaValidation';
import paymentSchema from '../schemas/paymentSchema';
import onlinePaymentSchema from '../schemas/onlinePaymentSchema';

const paymentRouter = Router();
paymentRouter.post('/payment', schemaValidation(paymentSchema), payment);
paymentRouter.post('/online-payment', schemaValidation(onlinePaymentSchema), onlinePayment);
export default paymentRouter;