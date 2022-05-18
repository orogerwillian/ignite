import {CreateCarUseCase} from "@modules/cars/useCases/car/create/CreateCarUseCase";
import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import {AppError} from "@errors/AppError";
import exp from "constants";

let createCarUseCase: CreateCarUseCase;
let carsReposity: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsReposity = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsReposity);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name car",
            description: "Description Car",
            daily_rate: 100,
            licence_plate: "ABC-1234",
            brand: "Brand",
            category_id: "category",
            fine_amount: 60
        });

        expect(car).toHaveProperty("id");
    });

    it("show not be able to create a car with exists license plate", function () {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car 1",
                description: "Description Car",
                daily_rate: 100,
                licence_plate: "ABC-1234",
                brand: "Brand",
                category_id: "category",
                fine_amount: 60
            });

            await createCarUseCase.execute({
                name: "Car 2",
                description: "Description Car",
                daily_rate: 100,
                licence_plate: "ABC-1234",
                brand: "Brand",
                category_id: "category",
                fine_amount: 60
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("show not be able to create a car with available true as default", async function () {
        const car = await createCarUseCase.execute({
            name: "Car Avaliable",
            description: "Description Car",
            daily_rate: 100,
            licence_plate: "ABCD-1234",
            brand: "Brand",
            category_id: "category",
            fine_amount: 60
        });

        expect(car.available).toBe(true);
    });
})