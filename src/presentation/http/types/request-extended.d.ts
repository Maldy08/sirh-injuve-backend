// src/presentation/http/types/request-extended.d.ts

import { User } from '../../../domain/entities/user.entity';

declare namespace Express {
  export interface Request {
    user?: User; 
  }
}