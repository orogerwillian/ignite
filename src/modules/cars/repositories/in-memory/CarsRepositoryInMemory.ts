import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({
                     brand,
                     category_id,
                     licence_plate,
                     description,
                     fine_amount,
                     daily_rate,
                     name
                 }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            brand,
            category_id,
            licence_plate,
            description,
            fine_amount,
            daily_rate,
            name
        });

        this.cars.push(car);

        return car;
    }

    async findByLicencePlate(licencePlate: string): Promise<Car> {
        return this.cars.find(car => car.licence_plate === licencePlate);
    }

}

export {CarsRepositoryInMemory}