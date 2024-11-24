import 'reflect-metadata';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {connectDatabase} from './infrastructure/database/DatabaseConnection';
import {AuthRoutes} from './infrastructure/routes/AuthRoutes';
import {CartRoutes} from './infrastructure/routes/CartRoute';

dotenv.config();

const app = express();

const startServer = async () => {
  await connectDatabase();


  app.use(express.json());
  app.use(cors());

  app.use('/api/auth', AuthRoutes);
  app.use('/api/cart', CartRoutes);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startServer();
