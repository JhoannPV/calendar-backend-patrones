import { AuthDto } from "../../..";

export abstract class AuthDtoFactory {
    abstract create(data: { [key: string]: any }): AuthDto;
}