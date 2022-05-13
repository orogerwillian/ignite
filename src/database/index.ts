import { createConnection } from "typeorm";

createConnection()
  .then(() => {
    console.log("Database connected!");
  })
  .catch(error => {
    throw new Error(error)
  });