import { RegisterUserDto } from "../../../..";
import { AuthDtoFactory } from "../auth-dto.factory";

export class RegisterUserDtoFactory extends AuthDtoFactory {
    create(data: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password } = data;

        return RegisterUserDto.build(name, email, password);
    }
}