import { Router } from 'express';
import { container } from '../../../inversify.config';
import { TYPES } from '../../../types';
import { UserController } from '../controllers/user.controller';

const router = Router();

// Obtenemos el controlador del contenedor de DI.
// Como ya tiene el LoginUserUseCase inyectado, podemos usarlo directamente.
const userController = container.get<UserController>(TYPES.UserController);

// Definimos la ruta POST para el login
router.post('/login', (req, res) => userController.login(req, res));

export default router;