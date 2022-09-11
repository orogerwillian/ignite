import { getRepository, Repository } from "typeorm";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({available})
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }

  async create({
                 id,
                 brand,
                 category_id,
                 daily_rate,
                 description,
                 name,
                 fine_amount,
                 license_plate,
                 specifications
               }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      brand,
      category_id,
      daily_rate,
      description,
      name,
      fine_amount,
      license_plate,
      specifications
    });

    await this.repository.save(car);

    return car;
  }

  findByLicencePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("car")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("brand like :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    console.log(carsQuery.getSql());

    return await carsQuery.getMany();
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne(id);
  }

}

export { CarsRepository };