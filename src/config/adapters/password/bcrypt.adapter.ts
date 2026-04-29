import { compareSync, hashSync } from 'bcryptjs';
import { IPasswordAdapter } from './password.adapter.interface';

export class BcryptAdapter implements IPasswordAdapter {
    hash(password: string): string {
        return hashSync(password);
    }

    compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }
}
