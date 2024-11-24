import { Request, Response } from "express";
import {User} from '../../domain/entities';
import {CreateUserDTO} from '../../application/dtos/CreateUserDTO';
import {validateRequest} from '../../infrastructure/middlewares/validateRequest';
import {LoginUserDTO} from '../../application/dtos/LoginUserDTO';
import {ISignInUserUseCase} from '../../application/interfaces/ISignInUserUseCase';
import {ISignUpUserUseCase} from '../../application/interfaces/ISignUpUserUseCase';

export class AuthController {
  constructor(private signUpUserUseCase: ISignUpUserUseCase,
              private signInUserUseCase: ISignInUserUseCase,) {}

  public signUp: Function[] = [
    validateRequest(CreateUserDTO),

    async (req: Request<null, null, CreateUserDTO>, res: Response): Promise<Response> =>  {
      const { name, email, password } = req.body;

      try {
        const userEntity = new User(null, name, email, password)

        const newUser = await this.signUpUserUseCase.execute(userEntity);

        return res.status(201).json(newUser);
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating user" });
      }
    }
  ]

  public signIn: Function[] = [
    validateRequest(LoginUserDTO),
    async (req: Request<null, null, LoginUserDTO>, res: Response): Promise<Response> =>  {
      console.log('here')
      const { email, password } = req.body;

      try {
        const loginCredentials = await this.signInUserUseCase.execute(email, password);

        return res.status(200).json(loginCredentials);
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating user" });
      }
    }
  ]
}
