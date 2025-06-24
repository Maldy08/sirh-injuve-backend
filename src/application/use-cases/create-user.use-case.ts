import {injectable, inject} from 'inversify';
import {TYPES} from '../../types'

import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PasswordService } from '../services/password.service';


type CreateUserInput = {
    email: string;
    username: string;
    passwordPlain: string;
}

@injectable()
export class CreateUserUseCase {
    constructor(
      @inject(TYPES.UserRepository)  private readonly userRepository: UserRepository,
      @inject(TYPES.PasswordService)  private readonly passwordService: PasswordService
    ) { }


    async execute(input: CreateUserInput): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            // Es importante dar mensajes de error claros.
            throw new Error('El correo electrónico ya está registrado.');
        }

        const passwordHash = await this.passwordService.hash(input.passwordPlain);

        const newUser = await this.userRepository.create({
      email: input.email,
      username: input.username, // Usamos username en lugar de name
      passwordHash: passwordHash,
        });
        return newUser;

    }
}