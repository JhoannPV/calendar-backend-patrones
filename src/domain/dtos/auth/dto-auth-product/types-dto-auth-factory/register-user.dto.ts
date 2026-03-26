import { AuthDto } from "../../../..";

export class RegisterUserDto extends AuthDto {
    private constructor(
        public name: string,
        email: string,
        password: string,
    ) {
        super(email, password);
    }

    static build(name: string, email: string, password: string): [string?, RegisterUserDto?] {
        if (!name) return ['Missing name'];
        if (!email) return ['Missing email'];
        if (!password) return ['Missing password'];

        return [undefined, new RegisterUserDto(name, email.toLowerCase(), password)];
    }
}