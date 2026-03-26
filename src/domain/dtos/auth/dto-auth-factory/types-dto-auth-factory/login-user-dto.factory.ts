import { LoginUserDto } from "../../../..";
import { AuthDtoFactory } from "../auth-dto.factory";

export class LoginUserDtoFactory extends AuthDtoFactory {
    create(data: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = data;

        return LoginUserDto.build(email, password);
    }
}