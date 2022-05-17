import {Request, Response} from "express";
import {container} from "tsyringe";

import {ICreateUserDTO} from "@modules/accounts/dtos/ICreateUserDTO";
import {CreateUserUseCase} from "@modules/accounts/useCases/user/create/CreateUserUseCase";

class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
            password,
            driver_license
        } = request.body as ICreateUserDTO;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute({
            name,
            email,
            password,
            driver_license
        });

        return response.status(201).send();
    }
}

export {CreateUserController}