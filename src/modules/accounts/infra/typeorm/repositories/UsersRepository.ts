import {getRepository} from "typeorm";

import {ICreateUserDTO} from "@modules/accounts/dtos/ICreateUserDTO";
import {User} from "@modules/accounts/infra/typeorm/entities/User";
import {IUserRepository} from "@modules/accounts/repositories/IUserRepository";

class UsersRepository implements IUserRepository {

    private repository = getRepository(User);

    async create({
                     id,
                     name,
                     email,
                     driver_license,
                     password,
                     avatar
                 }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            id,
            name,
            email,
            driver_license,
            password,
            avatar
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({email})
    }

    async findById(id: string): Promise<User> {
        return await this.repository.findOne(id);
    }

}

export {UsersRepository}