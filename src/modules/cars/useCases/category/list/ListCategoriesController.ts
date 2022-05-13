import {Request, Response} from "express";
import {ListCategoriesUseCase} from "./ListaCategoriesUseCase";
import {container} from "tsyringe";

class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {

        const listCategoryUseCase = container.resolve(ListCategoriesUseCase);
        const allCategories = await listCategoryUseCase.execute();

        return response.json(allCategories);
    }
}

export {ListCategoriesController};