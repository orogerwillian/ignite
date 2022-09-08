import { AppError } from "@errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {
  }

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenedByCar(car_id);
    const minimumHoursToRental = 24;

    if (carUnavailable) {
      throw new AppError("Car is unavailable!");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenedByUser(user_id);
    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for this user!");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHoursToRental) {
      throw new AppError("Invalid return time!");
    }

    return await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });
  }
}