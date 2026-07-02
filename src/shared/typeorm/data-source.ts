import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

import City from "@modules/cities/typeorm/entities/City";
import Forecast from "@modules/forecasts/typeorm/entities/Forecast";
import User from "@shared/typeorm/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker", 
  database: "api-clima",      

  synchronize: false,
  logging: true,

  entities: [
    City,
    Forecast,
    User
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