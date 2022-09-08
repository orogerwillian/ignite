import "reflect-metadata"

import {CreateCarSpecificationUseCase} from "@modules/cars/useCases/carSpecification/CreateCarSpecificationUseCase";
import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import {AppError} from "@errors/AppError";
import {SpecificationReposityInMemory} from "@modules/cars/repositories/in-memory/SpecificationReposityInMemory";

let createCarSpecification: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationReposityInMemory

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationReposityInMemory();
        createCarSpecification = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    })

    it('should not be able to add a new specification to a non-existent car', async () => {
        await expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecification.execute({car_id, specifications_id});
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            brand: "Brand",
            category_id: "category",
            fine_amount: 60
        });

        const specification = await specificationRepositoryInMemory.create({
            name: "test",
            description: "test"
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecification.execute({
            car_id: car.id,
            specifications_id
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});