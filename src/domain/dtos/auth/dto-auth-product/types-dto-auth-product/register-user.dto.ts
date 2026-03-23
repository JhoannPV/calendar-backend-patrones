import { AuthDto } from "../../../..";

export class RegisterUserDto extends AuthDto {
    private constructor(
        public name: string,
        email: string,
        password: string,
    ) {
        super(email, password);
    }

    static build(name: string, email: string, password: string): RegisterUserDto {
        return new RegisterUserDto(name, email, password);
    }
}