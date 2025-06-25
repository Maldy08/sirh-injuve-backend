import { injectable } from "inversify";
import { BancoSat } from "../../../domain/entities/banco-sat.entity";
import { BancoSatRepository } from "../../../domain/repositories/banco-sat.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@injectable()
export class BancoSatPrismaRepository implements BancoSatRepository {
    async findByCodigo(codigo: string): Promise<BancoSat | null> {
        const banco = await prisma.bancoSat.findUnique({
            where: { codigo },
        });
        return banco as BancoSat | null;
    }
    async findAll(): Promise<BancoSat[]> {
        const bancos = await prisma.bancoSat.findMany();
        return bancos as BancoSat[];
    }

}