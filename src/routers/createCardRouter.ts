import { Router } from 'express';
import createCard from '../controllers/createCardController';
import apiKeyValidation from '../middlewares/apiKeyValidation';
import schemaValidation from '../middlewares/schemaValidation';
import createCardSchema from '../schemas/createCardSchema';

const router = Router();
router.post('/cards', apiKeyValidation, schemaValidation(createCardSchema), createCard);
export default router;