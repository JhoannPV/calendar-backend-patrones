import { Router } from 'express';
import { EventsController } from './controller';
import {
  CreateEvent,
  DeleteEvent,
  DeleteEventCascade,
  GetEvents,
  UpdateEvent,
} from '../../domain';
import {
  EventNotificationFactory,
  EventsDatasourceImpl,
  EventsRepositoryImpl,
  EventsRepositoryProxy,
} from '../../insfrastructure';
import {
  AuthMiddleware,
  ResErrorsMiddleware,
  ValidatorFieldsMiddleware,
} from '..';

export class EventsRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new EventsDatasourceImpl();
    const eventsRepository = new EventsRepositoryImpl(datasource);
    const eventsRepositoryProxyCache = new EventsRepositoryProxy(eventsRepository);

    const eventPublisher = EventNotificationFactory.createPublisher();

    const getEventsUseCase = new GetEvents(eventsRepositoryProxyCache);
    const createEventUseCase = new CreateEvent(eventsRepositoryProxyCache, eventPublisher);
    const updateEventUseCase = new UpdateEvent(eventsRepositoryProxyCache, eventPublisher);
    const deleteEventUseCase = new DeleteEvent(eventsRepositoryProxyCache, eventPublisher);
    const deleteEventCascadeUseCase = new DeleteEventCascade(eventsRepository);

    const controller = new EventsController(
      getEventsUseCase,
      createEventUseCase,
      updateEventUseCase,
      deleteEventUseCase,
      deleteEventCascadeUseCase,
    );

    router.get(
      '/get-events',
      AuthMiddleware.validateJWT,
      controller.getEvents
    );

    router.post(
      '/create-event',
      AuthMiddleware.validateJWT,
      ValidatorFieldsMiddleware.validateFieldsCreateUpdateEvent,
      ResErrorsMiddleware.resErrors,
      controller.createEvent
    );

    router.put(
      '/update-event/:id',
      AuthMiddleware.validateJWT,
      ValidatorFieldsMiddleware.validateFieldsCreateUpdateEvent,
      ResErrorsMiddleware.resErrors,
      controller.updateEvent
    );

    router.delete(
      '/delete-event/:id',
      AuthMiddleware.validateJWT,
      controller.deleteEvent
    );

    router.delete(
      '/delete-event-cascade/:id',
      AuthMiddleware.validateJWT,
      controller.deleteEventCascade
    );

    return router;
  }
}