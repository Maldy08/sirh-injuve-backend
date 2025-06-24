import { injectable } from "inversify";
import * as jwt from 'jsonwebtoken';
import { JwtPayload, JwtService } from "../../application/services/jwt.service";

@injectable()
export class JsonWebTokenService implements JwtService {
    private readonly secret: string;

    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not set");
        }
        this.secret = process.env.JWT_SECRET;
    }

    async generateToken(payload: JwtPayload): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, { expiresIn: '8h' }, (err, token) => {
                if (err || !token) {
                    return reject(err);
                }
                resolve(token);
            });
        });
    }

    async verifyToken(token: string): Promise<JwtPayload | null> {
        return new Promise((resolve) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err || !decoded) {
                    return resolve(null);
                }
                // Nos aseguramos de que el payload decodificado tenga la estructura que esperamos.
                resolve(decoded as JwtPayload);
            });
        });
    }

    decodeToken(token: string): Promise<JwtPayload | null> {
        throw new Error("Method not implemented.");
    }



}