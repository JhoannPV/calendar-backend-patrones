export interface IPasswordAdapter {
    hash(password: string): string;
    compare(password: string, hashed: string): boolean;
}
