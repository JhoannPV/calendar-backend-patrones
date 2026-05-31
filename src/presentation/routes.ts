import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { EventsRoutes } from './events/routes';
import { PushRoutes } from './push/routes'; // <-- agregar

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/events', EventsRoutes.routes);
    router.use('/api/push', PushRoutes.routes); // <-- agregar
    return router;
  }
}