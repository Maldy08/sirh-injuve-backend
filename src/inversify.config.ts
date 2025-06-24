import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

//Interfaces
import { UserRepository } from './domain/repositories/user.repository';

//Implementations
import { UserPrismaRepository } from './infrastructure/database/repositories/user.prisma.repository';

// Security Services
import { PasswordService } from './application/services/password.service';
import { BcryptService } from './infrastructure/security/bcrypt.service';
import { JwtService } from './application/services/jwt.service';
import { JsonWebTokenService } from './infrastructure/security/jwt.service';

//Use Cases and Controllers
import { UserController } from './presentation/http/controllers/user.controller';

import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';


const container = new Container();

// -- BINDINGS --
// Le decimos al contenedor cómo resolver cada dependencia.

// Repositorios (Singleton: una única instancia para toda la app)
container.bind<UserRepository>(TYPES.UserRepository).to(UserPrismaRepository).inSingletonScope();

// Servicios (Singleton: una única instancia para toda la app)
container.bind<PasswordService>(TYPES.PasswordService).to(BcryptService).inSingletonScope();
container.bind<JwtService>(TYPES.JwtService).to(JsonWebTokenService).inSingletonScope();
// Casos de uso (Transient: una nueva instancia por cada solicitud)
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase).inTransientScope();
container.bind<LoginUserUseCase>(TYPES.LoginUserUseCase).to(LoginUserUseCase).inTransientScope();

// Controladores (Transient: una nueva instancia por cada solicitud)
container.bind<UserController>(TYPES.UserController).to(UserController).inTransientScope();

// Exportamos el contenedor para que pueda ser utilizado en otras partes de la aplicación
export { container };

