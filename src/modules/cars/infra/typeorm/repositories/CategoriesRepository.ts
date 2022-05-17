import {getRepository, Repository} from "typeorm";

import {ICategoriesRepository, ICreateCategoryDTO} from "@modules/cars/repositories/ICategoriesRepository";
import {Category} from "@modules/cars/infra/typeorm/entities/Category";

class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({name, description}: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        return await this.repository.find();
    }

    async findByName(name: string): Promise<Category> {
        return await this.repository.findOne({name});
    }
}

export {CategoriesRepository};
