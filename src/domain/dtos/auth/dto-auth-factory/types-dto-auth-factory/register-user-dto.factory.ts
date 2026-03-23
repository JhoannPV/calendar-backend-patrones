import { RegisterUserDto } from "../../../..";
import { CustomError } from "../../../../errors/custom.error";
import { AuthDtoFactory } from "../auth-dto.factory";

export class RegisterUserDtoFactory extends AuthDtoFactory {
    create(data: { [key: string]: any }): RegisterUserDto {
        const { name, email, password } = data;

        if (!name) throw CustomError.badRequest('Missing name');
        if (!email) throw CustomError.badRequest('Missing email');
        if (!password) throw CustomError.badRequest('Missing password');

        return RegisterUserDto.build(name, email.toLowerCase(), password);
    }
}