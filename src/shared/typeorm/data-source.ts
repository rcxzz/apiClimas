import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

import Trainer from "@modules/trainers/typeorm/entities/Trainer";
import Pokemon from "@modules/pokemons/typeorm/entities/Pokemon";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pokemon",
  database: "api-pokemon",

  synchronize: false,
  logging: true,

  entities: [
    Trainer,
    Pokemon,
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