

import { Request, Response, NextFunction } from 'express';
import { container } from '../../../inversify.config';
import { TYPES } from '../../../types';
import { JwtService } from '../../../application/services/jwt.service';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { error } from 'console';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  
  // Obtenemos las dependencias que necesitamos desde el contenedor de Inversify.
  const jwtService = container.get<JwtService>(TYPES.JwtService);
  const userRepository = container.get<UserRepository>(TYPES.UserRepository);
  
  
  try {
    // 1. Buscamos el token en las cabeceras de la petición.
    const authHeader = req.headers.authorization;
    
    // 2. Verificamos que la cabecera exista y tenga el formato correcto ("Bearer <token>").
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Acceso no autorizado. No se proveyó un token.' });
    }

    // 3. Extraemos el token, quitando la parte "Bearer ".
    const token = authHeader.split(' ')[1];

    // 4. Verificamos el token usando nuestro servicio JWT.
    // Este servicio comprueba si el token es válido y no ha expirado.
    const payload = await jwtService.verifyToken(token);
    if (!payload) {
      return res.status(401).json({ message: 'Acceso no autorizado. Token inválido o expirado.' });
    }

    // 5. Buscamos al usuario en la base de datos con el ID del payload del token.
    // Este paso es crucial para asegurarse de que el usuario todavía existe y no ha sido desactivado/eliminado.
    const user = await userRepository.findById(payload.id); 
    if (!user) {
      return res.status(401).json({ message: 'Acceso no autorizado. El usuario de este token ya no existe.' });
    }
    

    req.user = user;

    next();

  } catch (error) {
    // Si ocurre cualquier otro error, denegamos el acceso.
    return res.status(401).json({ message: 'Acceso no autorizado.' });
  }
}