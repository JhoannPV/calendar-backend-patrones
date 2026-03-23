import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/user.entity";
import { Request } from "express";

export abstract class AuthRepository {

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract renewToken(req: Request): Promise<UserEntity>;

}