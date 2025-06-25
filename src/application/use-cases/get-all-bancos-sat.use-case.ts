// src/application/use-cases/get-all-bancos-sat.use-case.ts

import { injectable, inject } from 'inversify';
import { BancoSat } from '../../domain/entities/banco-sat.entity';
import { BancoSatRepository } from '../../domain/repositories/banco-sat.repository';
import { TYPES } from '../../types';

@injectable()
export class GetAllBancosSatUseCase {

  // Inyectamos la dependencia del repositorio.
  // El caso de uso le pide al "contrato", no a la implementación de Prisma.
  constructor(
    @inject(TYPES.BancoSatRepository) private readonly bancoSatRepository: BancoSatRepository
  ) {}

  /**
   * Ejecuta el caso de uso.
   * @returns Una promesa que se resuelve con un array de todos los bancos.
   */
  async execute(): Promise<BancoSat[]> {
    // La lógica es simple: delega la tarea de buscar todos los bancos al repositorio.
    const bancos = await this.bancoSatRepository.findAll();
    return bancos;
  }
}