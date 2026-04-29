import { AuthRepository, CustomError, LoginUserDto, UserToken } from "../..";
import { JwtAdapter, ITokenAdapter } from "../../../config";

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly tokenAdapter: ITokenAdapter = new JwtAdapter(),
    ) { }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDto);

        const expiredToken: number = 60 * 60 * 2; // 2 horas
        const token = await this.tokenAdapter.generateToken({ id: user.id }, expiredToken);

        if (!token) {
            throw CustomError.internalServer('Error generating token');
        }

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