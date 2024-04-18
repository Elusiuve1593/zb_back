import { AuthService } from './auth.service';
import { AuthenticationDTO } from './dto/authentication.dto';
import { RegistrationDTO } from './dto/registration.dto';
import { TokensDTO } from './dto/tokens.dto';
import { Auth } from './schema/auth.schema';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    userRegistration(registration: RegistrationDTO): Promise<Auth>;
    authentication(authentication: AuthenticationDTO): Promise<TokensDTO | null>;
    refresh(refreshToken: TokensDTO): Promise<TokensDTO>;
}
