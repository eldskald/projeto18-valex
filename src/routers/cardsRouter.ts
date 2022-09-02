import { Router } from 'express';
import createCard from '../controllers/createCardController';
import activateCard from '../controllers/activateCardController';
import apiKeyValidation from '../middlewares/apiKeyValidation';
import schemaValidation from '../middlewares/schemaValidation';
import createCardSchema from '../schemas/createCardSchema';
import activateCardSchema from '../schemas/activateCardSchema';

const router = Router();

router.post('/cards', apiKeyValidation, schemaValidation(createCardSchema), createCard);
router.patch('/cards/activate', schemaValidation(activateCardSchema), activateCard)

export default router;