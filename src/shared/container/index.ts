import {container} from "tsyringe"
import {ICategoriesRepository} from "../../modules/cars/repositories/ICategoriesRepository";
import {CategoriesRepository} from "../../modules/cars/repositories/implementations/CategoriesRepository";
import {ISpecificationsRepository} from "../../modules/cars/repositories/ISpecificationsRepository";
import {SpecificationsRepository} from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import {IUserRepository} from "../../modules/accounts/repositories/IUserRepository";
import {UsersRepository} from "../../modules/accounts/repositories/implementations/UsersRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUserRepository>(
    "UsersRepository",
    UsersRepository
);