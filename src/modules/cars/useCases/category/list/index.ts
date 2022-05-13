import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListaCategoriesUseCase";
import { CategoriesRepository } from "../../../repositories/implementations/CategoriesRepository";

export default () => {
  const categoriesRepository = new CategoriesRepository();
  const listCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);

  return new ListCategoriesController(listCategoryUseCase);
}