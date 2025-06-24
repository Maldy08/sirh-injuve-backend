import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { UserRepository } from "../../domain/repositories/user.repository";
import { PasswordService } from "../services/password.service";
import { JwtService } from "../services/jwt.service";

type LoginUserInput = {
  email: string;
  passwordPlain: string;
}

type LoginUserOutput = {
  token: string;
}

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.PasswordService) private readonly passwordService: PasswordService,
    @inject(TYPES.JwtService) private readonly jwtService: JwtService
  ) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    // 1. Buscar al usuario por email
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // 2. Verificar que el usuario esté activo
    if (!user.estatus) { // Asumiendo que tu entidad tiene 'isActive'. Si no, usa 'estatus'
      throw new Error("La cuenta de usuario está inactiva.");
    }

    // --- INICIO DE LA DEPURACIÓN ---
    console.log("=============================================");
    console.log("Depurando Comparación de Contraseña:");
    console.log("  -> Contraseña enviada (Plain Text):", `"${input.passwordPlain}"`);
    console.log("  -> Hash guardado en la Base de Datos:", `"${user.passwordHash}"`);
    // --- FIN DE LA DEPURACIÓN ---

    // 3. Comparar la contraseña
    const isPasswordMatch = await this.passwordService.compare(input.passwordPlain, user.passwordHash);

    // --- Log del resultado ---
    console.log("  -> ¿Las contraseñas coinciden?:", isPasswordMatch);
    console.log("=============================================");

    if (!isPasswordMatch) {
      throw new Error("Credenciales inválidas"); 
    }

    // ... (el resto del código sigue igual)
    const token = await this.jwtService.generateToken({
      id: user.id.toString(),
      email: user.email,
    });

    return { token };
  }

}