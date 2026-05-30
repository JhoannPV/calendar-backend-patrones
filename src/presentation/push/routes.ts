import { Router } from 'express';
import { PushController } from './controller';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware'; // <-- agregar

export class PushRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PushController();

    router.get('/vapid-key', controller.getVapidKey);
    router.post('/subscribe', AuthMiddleware.validateJWT, controller.saveSubscription);

    return router;
  }
}