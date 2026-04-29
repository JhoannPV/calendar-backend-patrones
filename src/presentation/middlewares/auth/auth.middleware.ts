import { NextFunction, Request, Response } from "express";
import { JwtAdapter, ITokenAdapter } from "../../../config";
import { UserModel } from "../../../data/mongodb";


export class AuthMiddleware {
    private static readonly tokenAdapter: ITokenAdapter = new JwtAdapter();

    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {

        const authorization = req.header('Authorization');

        if (!authorization) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        if (!authorization.startsWith('Bearer')) {
            res.status(401).json({ error: 'Invalid Bearer Token' });
            return;
        }

        const token = authorization.split(' ')[1] || '';

        try {
            const payload = await AuthMiddleware.tokenAdapter.validateToken<{ id: string }>(token);

            if (!payload) {
                res.status(401).json({ error: 'Invalid Token' });
                return;
            }

            const user = await UserModel.findById(payload.id);
            if (!user) {
                res.status(401).json({ error: 'Invalid Token - User not found' })
                return;
            }

            if (req.body) {
                req.body.user = user;
            } else {
                req.body = { user };
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}