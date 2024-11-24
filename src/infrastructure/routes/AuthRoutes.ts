import {Router} from 'express';
import {AuthController} from '../../interfaces/controllers/AuthController';
import {UserRepositoryImpl} from '../persistence/UserRepositoryImpl';
import {HashingService} from '../services/HashingService';
import {JwtService} from '../services/JwtService';
import {SignUpUserUseCase} from '../../application/use-cases/SignUpUserUseCase';
import {SignInUseCase} from '../../application/use-cases/SignInUseCase';

const userRepository = new UserRepositoryImpl();
const hashingService = new HashingService();
const jwtService = new JwtService();
const signUpUserUseCase = new SignUpUserUseCase(userRepository, hashingService, jwtService);
const signInUserUseCase = new SignInUseCase(userRepository, hashingService, jwtService);

const authController = new AuthController(signUpUserUseCase, signInUserUseCase)

export const AuthRoutes = Router();

AuthRoutes.post('/sign-up', authController.signUp);
AuthRoutes.post('/sign-in', authController.signIn);
