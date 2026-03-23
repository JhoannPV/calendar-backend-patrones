import { AuthDto } from "../../../..";

export class LoginUserDto extends AuthDto {
    private constructor(
        email: string,
        password: string,
    ) {
        super(email, password);
    }

    static build(email: string, password: string): LoginUserDto {
        return new LoginUserDto(email, password);
    }
}