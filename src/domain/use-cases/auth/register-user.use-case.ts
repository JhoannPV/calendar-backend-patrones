import { AuthRepository, CustomError, RegisterUserDto, UserToken } from "../..";
import { JwtAdapter, ITokenAdapter } from "../../../config";

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>,
}

export class RegisterUser implements RegisterUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly tokenAdapter: ITokenAdapter = new JwtAdapter(),
    ) { }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        //Crear el usuario
        const user = await this.authRepository.register(registerUserDto);

        //Token
        const expiredToken: number = 60 * 60 * 2; // 2 horas
        const token = await this.tokenAdapter.generateToken({ id: user.id }, expiredToken);
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
    }

}