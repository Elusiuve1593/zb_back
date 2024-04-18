import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArgonService {
  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async comparePassword(
    hashedPassword: string,
    candidatePassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, candidatePassword);
  }
}
