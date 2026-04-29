export interface ITokenAdapter {
    generateToken(payload: Object, duration?: number): Promise<string | null>;
    validateToken<T>(token: string): Promise<T | null>;
}
