export interface JwtPayload {
    id: number;
    email: string;
}

export interface JwtService {
    generateToken(payload: JwtPayload): Promise<string>;
    verifyToken(token: string): Promise<JwtPayload | null>;
    decodeToken(token: string): Promise<JwtPayload | null>;
}