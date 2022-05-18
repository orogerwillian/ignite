import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";

interface ICarsRepository {

    create(data: ICreateCarDTO): Promise<Car>;

    findByLicencePlate(licencePlate: string): Promise<Car>;
}

export {ICarsRepository}