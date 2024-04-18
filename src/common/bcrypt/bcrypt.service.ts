import hashPassword  from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  async hashPass(password: string): Promise<string> {
    return await hashPassword.hash(password, 10);
  }

  async comparePassword(
    candidatePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await hashPassword.compare(candidatePassword, hashedPassword);
  }
}
