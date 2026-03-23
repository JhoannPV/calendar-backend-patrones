import { CreateEventDtoFactory, RegisterUserDtoFactory } from "../..";

export interface CreateDtoFactoryFamily {
    registerUser(): RegisterUserDtoFactory;
    createEvent(): CreateEventDtoFactory;
}

export abstract class OperationDtoAbstractFactory {
    abstract createDtoFactory(): CreateDtoFactoryFamily;
}
