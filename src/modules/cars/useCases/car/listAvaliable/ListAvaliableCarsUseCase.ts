import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";
import {inject, injectable} from "tsyringe";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvaliableCarsUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {
    }

    async execute({category_id, name, brand}: IRequest): Promise<Car[]> {
        return await this.carsRepository.findAvailable(brand, category_id, name);
    }
}

export {ListAvaliableCarsUseCase}