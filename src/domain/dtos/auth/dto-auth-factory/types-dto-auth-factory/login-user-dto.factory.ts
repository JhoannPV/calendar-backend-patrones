import { LoginUserDto } from "../../../..";
import { CustomError } from "../../../../errors/custom.error";
import { AuthDtoFactory } from "../auth-dto.factory";

export class LoginUserDtoFactory extends AuthDtoFactory {
    create(data: { [key: string]: any }): LoginUserDto {
        const { email, password } = data;

        if (!email) throw CustomError.badRequest('Missing email');
        if (!password) throw CustomError.badRequest('Missing password');

        return LoginUserDto.build(email.toLowerCase(), password);
    }
}