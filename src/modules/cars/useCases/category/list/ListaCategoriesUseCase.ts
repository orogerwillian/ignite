import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { Category } from "../../../entities/Category";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
  }

  async execute(): Promise<Category[]> {
    return await this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase };