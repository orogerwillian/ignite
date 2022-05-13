import {ICategoriesRepository} from "../../../repositories/ICategoriesRepository";
import {Category} from "../../../entities/Category";
import {inject, injectable} from "tsyringe";

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {
    }

    async execute(): Promise<Category[]> {
        return await this.categoriesRepository.list();
    }
}

export {ListCategoriesUseCase};