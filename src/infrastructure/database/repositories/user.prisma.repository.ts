// src/infrastructure/database/repositories/user.prisma.repository.ts

import { injectable } from "inversify";
import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();

@injectable()
export class UserPrismaRepository implements UserRepository {

    // El tipo 'user' ahora es compatible con lo que Prisma espera
    async create(user: Omit<User, 'id' | 'rol' | 'estatus' | 'creadoEn' | 'actualizadoEn'>): Promise<User> {
        const newUser = await prisma.user.create({
            data: user, // Ahora podemos pasar el objeto 'user' directamente
        });
        return newUser as User;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user as User | null;
    }

    // El 'id' ahora es un número, como espera Prisma
    async findById(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user as User | null;
    }

    async update(user: User): Promise<User> {
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: user,
        });
        return updatedUser as User;
    }
}