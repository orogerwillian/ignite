import {Request, Response} from "express";
import {ListCategoriesUseCase} from "./ListaCategoriesUseCase";

class ListCategoriesController {

    constructor(private listCategoryUseCase: ListCategoriesUseCase) {
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const allCategories = await this.listCategoryUseCase.execute();

        return response.json(allCategories);
    }
}

export {ListCategoriesController};