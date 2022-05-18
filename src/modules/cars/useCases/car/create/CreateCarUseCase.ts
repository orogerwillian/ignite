import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";
import {AppError} from "@errors/AppError";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";
import {inject, injectable} from "tsyringe";

@injectable()
class CreateCarUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {
    }

    async execute({
                      name,
                      description,
                      daily_rate,
                      license_plate,
                      brand,
                      category_id,
                      fine_amount
                  }: ICreateCarDTO): Promise<Car> {

        const carAlreadyExists = await this.carsRepository.findByLicencePlate(license_plate);

        if (carAlreadyExists) {
            throw new AppError("Car already exists!");
        }

        return await this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            category_id,
            fine_amount
        });
    }
}

export {CreateCarUseCase}