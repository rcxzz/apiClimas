import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

import City from "@modules/cities/typeorm/entities/City";
import Forecast from "@modules/forecasts/typeorm/entities/Forecast";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres", 
  database: "api-climas",      

  synchronize: false,
  logging: true,

  entities: [
    City,
    Forecast,
  ],

  migrations: [
    path.join(
      "src",
      "shared",
      "typeorm",
      "migrations",
      "*.ts",
    ),
  ],
});