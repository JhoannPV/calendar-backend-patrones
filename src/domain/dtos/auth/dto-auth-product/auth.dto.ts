export abstract class AuthDto {
    protected constructor(
        public email: string,
        public password: string,
    ) { }
}