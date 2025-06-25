// src/presentation/http/types/request-extended.d.ts



declare namespace Express {
  type User = import('../../../domain/entities/user.entity').User;
  export interface Request {
    user?: User; 
  }
}