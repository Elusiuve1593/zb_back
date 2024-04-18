import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticationDTO } from './dto/authentication.dto';
import { RegistrationDTO } from './dto/registration.dto';
import { Auth } from './schema/auth.schema';
import { TokensDTO } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async userRegistration(registration: RegistrationDTO): Promise<Auth> {
    const newUser = await this.authModel.create({
      ...registration,

    });

    return await this.authModel.findById(newUser._id).select('-password');
  }

  async existMail(email: string): Promise<RegistrationDTO | null> {
    return this.authModel.findOne({ email });
  }

  async authentication({
    email,
    password,
  }: AuthenticationDTO): Promise<TokensDTO | null> {
    if (!password) {
      throw new UnauthorizedException('Password is required');
    }
    const user = await this.authModel.findOne({ email });
    if (!user) throw new NotFoundException(`User with ${email} is not found`);

    const payload = { sub: user._id, userName: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '5d',
      }),
    };
  }

  async refresh({ refresh_token }: TokensDTO): Promise<TokensDTO> {
    try {
      const decodeRefreshToken: { sub: string } =
        await this.jwtService.verifyAsync(refresh_token);

      const user = await this.authModel.findById(decodeRefreshToken.sub);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const payload = { sub: user._id, userName: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '5d',
        }),
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
