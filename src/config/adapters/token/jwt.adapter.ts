import jwt from 'jsonwebtoken';
import { ITokenAdapter } from './token.adapter.interface';
import { envs } from '../../envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter implements ITokenAdapter {
    async generateToken(
        payload: Object,
        duration: number = 60 * 60 * 2    // 2 hours
    ): Promise<string | null> {

        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);
                resolve(token!);
            });
        });
    }

    async validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}
