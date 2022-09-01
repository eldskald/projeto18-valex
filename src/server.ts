import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { config } from 'dotenv';
import router from './router';
import errorHandler from './middlewares/errorHandler';
config();

const PORT: number = Number(process.env.PORT) || 4000;

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}...`);
});