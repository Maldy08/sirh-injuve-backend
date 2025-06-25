import { Router } from "express";
import { container } from "../../../inversify.config";
import { UserController } from "../controllers/user.controller";
import { TYPES } from "../../../types";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateUserDto } from "../dtos/create-user.dto";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();

const userController = container.get<UserController>(TYPES.UserController);
router.get('/profile', authMiddleware, (req, res) => {
       res.send(`
        <html>
          <head><title>Perfil</title></head>
          <body>
            <h1>Bienvenido a tu perfil</h1>
            <p>¡Este es contenido HTML directo desde el router!</p>
          </body>
        </html>
    `);
});


export default router;