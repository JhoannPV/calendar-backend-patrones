import { Request, Response } from 'express';
import { AuthRepository, CreateOperationDtoFactory, CustomError, LoginUser, LoginUserDtoFactory, RegisterUser, RenewToken } from '../../domain';

export class AuthController {

    private readonly createOperationDtoFactory = new CreateOperationDtoFactory();
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
        const [error, registerUserDto] = this.createOperationDtoFactory
            .createDtoFactory()
            .registerUser()
            .create(req.body);

        if (error) return res.status(400).json({ error });
        if (!registerUserDto) return res.status(400).json({ error: 'Invalid register user dto' });

        new RegisterUser(this.authRepository).execute(registerUserDto)
            .then(data => res.status(201).json(data))
            .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = this.loginUserDtoFactory.create(req.body);

        if (error) return res.status(400).json({ error });
        if (!loginUserDto) return res.status(400).json({ error: 'Invalid login user dto' });

        new LoginUser(this.authRepository).execute(loginUserDto)
            .then(data => res.status(201).json(data))
            .catch(error => this.handleError(error, res));
    }

    renewUser = (req: Request, res: Response) => {
        const userDto = new RenewToken(this.authRepository).execute(req)
            .then(data => res.status(201).json(data))
            .catch(error => this.handleError(error, res));
    }
}