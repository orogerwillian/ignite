import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {

   cars: Car[] = [];

    async create({
                     id,
                     brand,
                     category_id,
                     license_plate,
                     description,
                     fine_amount,
                     daily_rate,
                     name,
                     specifications
                 }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            id,
            brand,
            category_id,
            license_plate,
            description,
            fine_amount,
            daily_rate,
            name,
            specifications
        });

        this.cars.push(car);

        return car;
    }

    async findByLicencePlate(licensePlate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === licensePlate);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        return this.cars
            .filter(car => {
                if (car.available ||
                    (category_id && car.category_id === category_id) ||
                    (brand && car.brand === brand) ||
                    (name && car.name === name)) {
                    return car;
                }
                return null;
            })
    }

    async findById(car_id: string): Promise<Car> {
        return this.cars.find(car => car.id === car_id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
      const findIndex = this.cars.findIndex(car => car.id === id);
      this.cars[findIndex].available = available;
    }

}

export {CarsRepositoryInMemory}