import { Router } from "express";
import ensureAuthenticated from "@middlewares/ensureAuthenticated";

import { CreateRentalController } from "@modules/rentals/useCases/create/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolution/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listByUser/ListRentalsByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post(
  "/",
  ensureAuthenticated,
  createRentalController.handle
);

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };