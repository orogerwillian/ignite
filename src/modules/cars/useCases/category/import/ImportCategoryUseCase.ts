import fs from "fs";
import { parse } from "csv-parse";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { Express } from "express";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {

  constructor(private categoriesRepository: ICategoriesRepository) {
  }

  // @ts-ignore
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    this.saveCategories(categories);
  }

  // @ts-ignore
  private loadCategories(file: Express.Muter.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();
      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  private saveCategories(categories: IImportCategory[]) {
    categories.map(async (category) => {
      const { name, description } = category;
      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }
}

export { ImportCategoryUseCase };