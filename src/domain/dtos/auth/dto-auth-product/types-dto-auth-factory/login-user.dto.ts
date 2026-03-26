import { AuthDto } from "../../../..";

export class LoginUserDto extends AuthDto {
    private constructor(
        email: string,
        password: string,
    ) {
        super(email, password);
    }

    static build(email: string, password: string): [string?, LoginUserDto?] {
        if (!email) return ['Missing email'];
        if (!password) return ['Missing password'];

        return [undefined, new LoginUserDto(email.toLowerCase(), password)];
    }
}