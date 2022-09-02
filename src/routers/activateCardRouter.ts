import { Router } from 'express';
import activateCard from '../controllers/activateCardController';
import schemaValidation from '../middlewares/schemaValidation';
import activateCardSchema from '../schemas/activateCardSchema';

const router = Router();
router.patch('/cards/activate', schemaValidation(activateCardSchema), activateCard);
export default router;