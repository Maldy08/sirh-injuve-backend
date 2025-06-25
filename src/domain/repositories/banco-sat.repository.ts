import { BancoSat } from "../entities/banco-sat.entity";


export interface BancoSatRepository {
    findByCodigo(codigo: string): Promise<BancoSat | null>;
    findAll(): Promise<BancoSat[]>;
}