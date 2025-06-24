import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types'

import { Request, Response } from 'express';
import { CreateUserUseCase } from "../../../application/use-cases/create-user.use-case";
import { LoginUserUseCase } from '../../../application/use-cases/login-user.use-case';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.CreateUserUseCase) private readonly createUserUseCase: CreateUserUseCase,
    @inject(TYPES.LoginUserUseCase) private readonly loginUserUseCase: LoginUserUseCase
  ) { }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { email, username, passwordPlain } = req.body;
      const newUser = await this.createUserUseCase.execute({ email, username, passwordPlain });
      const { passwordHash, ...userResponse } = newUser;

      res.status(201).json(userResponse); // 201 Created

    } catch (error: any) {
      res.status(400).json({ message: error.message }); // 400 Bad Request
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, passwordPlain } = req.body;
      const result = await this.loginUserUseCase.execute({ email, passwordPlain });

      // Si el login es exitoso, devolvemos el token
      res.status(200).json(result);

    } catch (error: any) {
      // Si las credenciales son inválidas, el caso de uso lanzará un error
      res.status(401).json({ message: error.message }); // 401 Unauthorized
    }
  }
}