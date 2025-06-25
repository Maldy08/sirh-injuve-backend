import { Router } from 'express';
import { container } from '../../../inversify.config';
import { TYPES } from '../../../types';
import { UserController } from '../controllers/user.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { LoginUserDto } from '../dtos/login-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

const router = Router();

// Obtenemos el controlador del contenedor de DI.
// Como ya tiene el LoginUserUseCase inyectado, podemos usarlo directamente.
const userController = container.get<UserController>(TYPES.UserController);

// Definimos la ruta POST para el login
router.post('/login',
    validationMiddleware(LoginUserDto),
    (req, res) => userController.login(req, res));

    router.post("/register", 
        validationMiddleware(CreateUserDto),
        (req, res) => userController.create(req, res));

export default router;