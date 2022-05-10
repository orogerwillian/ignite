import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListaCategoriesUseCase";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoryUseCase);

export { listCategoriesController }