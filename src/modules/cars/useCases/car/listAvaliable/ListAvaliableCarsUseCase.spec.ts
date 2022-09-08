import "reflect-metadata"

import {ListAvaliableCarsUseCase} from "@modules/cars/useCases/car/listAvaliable/ListAvaliableCarsUseCase";
import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let listCarsUseCase: ListAvaliableCarsUseCase;
let carsRepositoyInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoyInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvaliableCarsUseCase(carsRepositoyInMemory);
    });

    it('should be able to listAvaliable all available cars', async () => {
        const car = await carsRepositoyInMemory.create({
            name: "Car1",
            description: "Carro description",
            daily_rate: 110,
            license_plate: "EXX-1212",
            brand: "Car_brand",
            fine_amount: 40,
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('should be able to listAvaliable all avaible cars by brand', async () => {
        const car = await carsRepositoyInMemory.create({
            name: "Car2",
            description: "Carro description",
            daily_rate: 110,
            license_plate: "EXX-1212",
            brand: "Car_brand_test",
            fine_amount: 40,
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({
            brand: "Car_brand_test"
        });

        expect(cars).toEqual([car]);
    });

    it('should be able to listAvaliable all avaible cars by name', async () => {
        const car = await carsRepositoyInMemory.create({
            name: "Car3",
            description: "Carro description",
            daily_rate: 110,
            license_plate: "EXX-1215",
            brand: "Car_brand_test",
            fine_amount: 40,
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({
            name: "Car3"
        });

        expect(cars).toEqual([car]);
    });

    it('should be able to listAvaliable all avaible cars by category', async () => {
        const car = await carsRepositoyInMemory.create({
            name: "Car3",
            description: "Carro description",
            daily_rate: 110,
            license_plate: "EXX-1215",
            brand: "Car_brand_test",
            fine_amount: 40,
            category_id: "12345"
        });

        const cars = await listCarsUseCase.execute({
            category_id: "12345"
        });

        expect(cars).toEqual([car]);
    });

});