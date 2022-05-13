import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {

  private repository: Repogsitory<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
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
    return await this.repository.findOne({ name });
  }
}

export { CategoriesRepository };
