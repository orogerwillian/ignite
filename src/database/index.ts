import { createConnection } from "typeorm";
import {AppError} from "../errors/AppError";

createConnection()
  .then(() => {
    console.log("Database connected!");
  })
  .catch(error => {
    throw new AppError(error)
  });