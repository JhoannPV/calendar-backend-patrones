import { Request, Response } from 'express';
import { AuthRepository, CustomError, LoginUser, LoginUserDtoFactory, RegisterUser, RegisterUserDtoFactory, RenewToken } from '../../domain';

export class AuthController {

    private readonly registerUserDtoFactory = new RegisterUserDtoFactory();
    private readonly loginUserDtoFactory = new LoginUserDtoFactory();

    constructor(
        private readonly authRepository: AuthRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    registerUser = (req: Request, res: Response) => {
        const registerUserDto = this.registerUserDtoFactory.create(req.body);

        new RegisterUser(this.authRepository).execute(registerUserDto!)
            .then(data => res.status(201).json(data))
            .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const loginUserDto = this.loginUserDtoFactory.create(req.body);

        new LoginUser(this.authRepository).execute(loginUserDto!)
            .then(data => res.status(201).json(data))
            .catch(error => this.handleError(error, res));
    }

    renewUser = (req: Request, res: Response) => {
        const userDto = new RenewToken(this.authRepository).execute(req)
            .then(data => res.status(201).json(data))
            .catch(error => this.handleError(error, res));
    }
}