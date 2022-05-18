import {Request, Response} from "express";
import {container} from "tsyringe";
import {CreateCarUseCase} from "@modules/cars/useCases/car/create/CreateCarUseCase";

class CreateCarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            category_id,
            fine_amount
        } = request.body;

        const createCarUseCase = container.resolve(CreateCarUseCase);
        const car = await createCarUseCase.execute({
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            category_id,
            fine_amount
        });

        return response.status(201).json(car);
    }
}

export {CreateCarController}