// src/domain/entities/user.entity.ts

export interface User {
  id: number; // <-- CAMBIO: de string a number
  username: string; // <-- CAMBIO: de name a username
  email: string;
  passwordHash: string;
  rol: string | null;
  estatus: boolean | null;
  creadoEn: Date | null;
  actualizadoEn: Date | null;
}