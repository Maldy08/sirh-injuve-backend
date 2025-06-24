import { compare, hash } from "bcryptjs";
import { PasswordService } from "../../application/services/password.service";
import { injectable } from "inversify";

@injectable()
export class BcryptService implements PasswordService{
    hash(password: string): Promise<string> {
        return hash(password, 10); // 10 es el número de rondas de salting
    }
    compare(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }

}