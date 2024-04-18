import { JwtService } from '@nestjs/jwt';
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    decoder(token: string): Promise<any>;
}
