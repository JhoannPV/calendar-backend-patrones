import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { isDate } from '../../../config';

export class ValidatorFieldsMiddleware {

    static validateFieldsRegister = async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all([
            check('name',     'Name is required').not().isEmpty().run(req),
            check('email',    'Email is required').not().isEmpty().run(req),
            check('email',    'Email is not valid').isEmail().run(req),
            check('password', 'Password is required').not().isEmpty().run(req),
            check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).run(req),
        ]);
        next();
    }

    static validateFieldsLogin = async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all([
            check('email',    'Email is required').not().isEmpty().run(req),
            check('email',    'Email is not valid').isEmail().run(req),
            check('password', 'Password is required').not().isEmpty().run(req),
            check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).run(req),
        ]);
        next();
    }

    static validateFieldsCreateUpdateEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { parentId, start, end } = req.body;

        // Si el evento tiene parentId (es subevento) → start y end son obligatorios
        // Si NO tiene parentId (puede ser padre o independiente) → start y end son opcionales
        const isSubEvent = !!parentId;

        const validators = [
            check('title',    'Title is required').not().isEmpty().run(req),
            check('bgColor',  'Background color is required').not().isEmpty().run(req),
            check('category', 'Category is required').not().isEmpty().run(req),
            check('category', 'Category is invalid').isIn(['general', 'work', 'sports', 'family', 'travel']).run(req),
        ];

        if (isSubEvent) {
            // Solo valida fechas si es un subevento
            validators.push(
                check('start', 'Start date is required for sub-events').custom(isDate).run(req),
                check('end',   'End date is required for sub-events').custom(isDate).run(req),
            );
        } else if (start || end) {
            // Si manda fechas (evento independiente con fechas), validar que sean válidas
            if (start) validators.push(check('start', 'Start date is invalid').custom(isDate).run(req));
            if (end)   validators.push(check('end',   'End date is invalid').custom(isDate).run(req));
        }

        await Promise.all(validators);
        next();
    }
}