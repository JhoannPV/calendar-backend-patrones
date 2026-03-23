import { RegisterUserDtoFactory } from "../../auth/dto-auth-factory/types-dto-auth-factory/register-user-dto.factory";
import { CreateEventDtoFactory } from "../../events/dto-events-factory/types-dto-events-factory/create-event-dto.factory";
import { OperationDtoAbstractFactory } from "../operation-dto-abstract.factory";

export class CreateOperationDtoFactory extends OperationDtoAbstractFactory {
    createDtoFactory() {
        const registerUser = () => new RegisterUserDtoFactory();
        const createEvent = () => new CreateEventDtoFactory();

        return {
            registerUser,
            createEvent,
        };
    }
}
