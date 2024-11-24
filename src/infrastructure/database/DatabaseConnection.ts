import { DataSource} from 'typeorm';
import {UserSchema} from '../persistence/models/UserSchema';
import dotenv from 'dotenv';
import {CartSchema} from '../persistence/models/CartSchema';
import {RoleAssignmentSchema} from '../persistence/models/RoleAssignmentSchema';
import {CartItemSchema} from '../persistence/models/CartItemSchema';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'family-cart',
  entities: [UserSchema, CartSchema, RoleAssignmentSchema, CartItemSchema],
  logging: false,
  synchronize: true,
});

export const connectDatabase = async () => {
  AppDataSource.initialize().
    then(() => {
      console.log('Database connection established successfully');
    })
    .catch((error) => console.log(error))
};
