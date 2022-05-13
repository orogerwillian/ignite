import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoriesRepository } from "../../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  return new CreateCategoryController(createCategoryUseCase);
}
