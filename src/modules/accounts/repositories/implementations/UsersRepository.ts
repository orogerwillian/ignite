import {IUserRepository} from "../IUserRepository";
import {ICreateUserDTO} from "../../dtos/ICreateUserDTO";
import {getRepository} from "typeorm";
import {User} from "../../entities/User";

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