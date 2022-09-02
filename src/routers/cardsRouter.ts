import { Router } from 'express';
import createCard from '../controllers/createCardController';
import activateCard from '../controllers/activateCardController';
import viewCard from '../controllers/viewCardController';
import apiKeyValidation from '../middlewares/apiKeyValidation';
import schemaValidation from '../middlewares/schemaValidation';
import createCardSchema from '../schemas/createCardSchema';
import activateCardSchema from '../schemas/activateCardSchema';

const router = Router();

router.post('/cards', apiKeyValidation, schemaValidation(createCardSchema), createCard);
router.patch('/cards/activate', schemaValidation(activateCardSchema), activateCard);
router.get('/card:id', viewCard);

export default router;