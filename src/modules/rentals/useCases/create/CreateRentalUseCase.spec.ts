import "reflect-metadata"
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "@modules/rentals/useCases/create/CreateRentalUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@errors/AppError";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {

  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dayJsDateProvider);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "125454",
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another opened to the same user", async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "125454",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "147997",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another opened to the same car", async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "125454",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "125454",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "125454",
        expected_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});