import { Router } from 'express';
import blockCard from '../controllers/blockCardController';
import unblockCard from '../controllers/unblockCardController';
import schemaValidation from '../middlewares/schemaValidation';
import blockUnblockCardSchema from '../schemas/blockUnblockCardSchema';

const blockUnblockCardRouter = Router();
blockUnblockCardRouter.patch('/cards/block', schemaValidation(blockUnblockCardSchema), blockCard);
blockUnblockCardRouter.patch('/cards/unblock', schemaValidation(blockUnblockCardSchema), unblockCard);
export default blockUnblockCardRouter;