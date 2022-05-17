import {inject, injectable} from "tsyringe";
import {UsersRepository} from "../../../infra/typeorm/repositories/UsersRepository";
import {IUserRepository} from "../../../repositories/IUserRepository";
import {ICreateUserDTO} from "../../../dtos/ICreateUserDTO";
import {hash} from "bcryptjs"
import {AppError} from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) {
    }

    async execute({
                      name,
                      email,
                      driver_license,
                      password
                  }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists!")
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            driver_license,
            password: passwordHash
        });
    }
}

export {CreateUserUseCase}