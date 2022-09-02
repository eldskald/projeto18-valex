import { Router } from 'express';
import recharge from '../controllers/rechargeController';
import apiKeyValidation from '../middlewares/apiKeyValidation';
import schemaValidation from '../middlewares/schemaValidation';
import rechargeSchema from '../schemas/rechargeSchema';

const rechargeRouter = Router();
rechargeRouter.post('/recharge', apiKeyValidation, schemaValidation(rechargeSchema), recharge);
export default rechargeRouter;