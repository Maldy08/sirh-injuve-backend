import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { GetAllBancosSatUseCase } from "../../../application/use-cases/get-all-bancos-sat.use-case";


@injectable()
export class BancoSatController {
      constructor(
    @inject(TYPES.GetAllBancosSatUseCase) private readonly getAllBancosSatUseCase: GetAllBancosSatUseCase
  ) {}

    async getAll(req: Request, res: Response): Promise<void> {
    try {
      // Llama al caso de uso para obtener los datos
      const bancos = await this.getAllBancosSatUseCase.execute();

      // Envía una respuesta exitosa con los datos
      res.status(200).json(bancos);

    } catch (error: any) {
      // En caso de un error inesperado, envía una respuesta de error del servidor
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  }
}