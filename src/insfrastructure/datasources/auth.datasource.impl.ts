import { UserMapper } from "..";
import { BcryptAdapter, IPasswordAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { Request } from "express";

export class AuthDatasourceImpl implements AuthDatasource {
    // Inyección de dependencias: permite usar cualquier adapter que implemente IPasswordAdapter
    constructor(
        private readonly passwordAdapter: IPasswordAdapter = new BcryptAdapter(),
    ) { }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        try {
            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.badRequest('User does not exist');

            const isMatching = this.passwordAdapter.compare(password, user.password);
            if (!isMatching) throw CustomError.badRequest('Password Incorrect');

            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            const exists = await UserModel.findOne({ email });
            if (exists) throw CustomError.badRequest('User already exisits');

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.passwordAdapter.hash(password),
            });

            await user.save();

            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async renewToken(req: Request): Promise<UserEntity> {
        const { id } = req.body.user;

        try {
            const user = await UserModel.findById(id);
            if (!user) throw CustomError.badRequest('User does not exist');
            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}