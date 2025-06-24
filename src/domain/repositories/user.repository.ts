// src/domain/repositories/user.repository.ts

import { User } from '../entities/user.entity';

export interface UserRepository {
  // Omitimos los campos que no se envían en la creación
  create(user: Omit<User, 'id' | 'rol' | 'estatus' | 'creadoEn' | 'actualizadoEn'>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>; // <-- CAMBIO: de string a number
  update(user: User): Promise<User>;
}