import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx"
});

datasource.initialize();