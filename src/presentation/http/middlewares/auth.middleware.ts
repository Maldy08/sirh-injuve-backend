import { Request, Response, NextFunction } from 'express';
import { container } from '../../../inversify.config';
import { TYPES } from '../../../types';
import { JwtService } from '../../../application/services/jwt.service';
import { UserRepository } from '../../../domain/repositories/user.repository';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  
  const jwtService = container.get<JwtService>(TYPES.JwtService);
  const userRepository = container.get<UserRepository>(TYPES.UserRepository);
  
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Acceso no autorizado. No se proveyó un token.' });
      return; // Usamos un return vacío para detener la ejecución
    }

    const token = authHeader.split(' ')[1];

    const payload = await jwtService.verifyToken(token);
    if (!payload) {
      res.status(401).json({ message: 'Acceso no autorizado. Token inválido o expirado.' });
      return; // Detenemos la ejecución
    }

    const user = await userRepository.findById(payload.id);
    if (!user) {
      res.status(401).json({ message: 'Acceso no autorizado. El usuario de este token ya no existe.' });
      return; // Detenemos la ejecución
    }
    
    req.user = user; 

    next();

  } catch (error) {
    res.status(401).json({ message: 'Acceso no autorizado.' });
  }
}