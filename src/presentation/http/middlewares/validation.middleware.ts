import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

export function validationMiddleware<T extends object>(dtoClass: new () => T): RequestHandler {
  return async (req, res, next) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints || {})).flat();
      
      // --- CAMBIO AQUÍ: Eliminamos la palabra "return" ---
      res.status(400).json({ message: 'Error de validación', errors: errorMessages });
      // Al llamar a res.json(), la ejecución para esta petición termina aquí, por lo que no se necesita un return.
      
    } else {
      req.body = dto;
      next();
    }
  };
}