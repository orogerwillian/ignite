import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {

  constructor(private importCategoryUseCase: ImportCategoryUseCase) {
  }

  handle(request: Request, response: Response): Response {
    // @ts-ignore
    const { file } = request;

    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };