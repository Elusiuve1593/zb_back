export declare class BcryptService {
    hashPassword(password: string): Promise<string>;
    comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean>;
}
