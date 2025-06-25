// src/presentation/http/routes/banco-sat.routes.ts

import { Router } from 'express';
import { container } from '../../../inversify.config';
import { TYPES } from '../../../types';
import { BancoSatController } from '../controllers/banco-sat.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const bancoSatController = container.get<BancoSatController>(TYPES.BancoSatController);

// Definimos la ruta GET. El middleware se ejecuta primero.
// Si el token es válido, pasa al controlador.
router.get(
  '/', 
  authMiddleware, 
  (req, res) => bancoSatController.getAll(req, res)
);

export default router;