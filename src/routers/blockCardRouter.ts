import { Router } from 'express';
import blockCard from '../controllers/blockCardController';
import schemaValidation from '../middlewares/schemaValidation';
import blockCardSchema from '../schemas/blockCardSchema';

const blockCardRouter = Router();
blockCardRouter.patch('/cards/block', schemaValidation(blockCardSchema), blockCard);
export default blockCardRouter;