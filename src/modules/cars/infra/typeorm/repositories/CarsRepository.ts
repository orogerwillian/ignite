import {getRepository, Repository} from "typeorm";

import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
                     brand,
                     category_id,
                     daily_rate,
                     description,
                     name,
                     fine_amount,
                     license_plate
                 }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            name,
            fine_amount,
            license_plate
        });

        await this.repository.save(car);

        return car;
    }

    findByLicencePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({license_plate});
    }

}

export {CarsRepository}