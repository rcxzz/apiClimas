import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class CreateForecasts1740000000002
  implements MigrationInterface
{
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: "forecasts",

        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "data_previsao",
            type: "date",
          },
          {
            name: "temperatura_maxima",
            type: "decimal",
            precision: 4,
            scale: 1,
          },
          {
            name: "temperatura_minima",
            type: "decimal",
            precision: 4,
            scale: 1,
          },
          {
            name: "condicao_climatica",
            type: "varchar",
          },
          {
            name: "umidade_ar",
            type: "int",
          },
          {
            name: "city_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],

        foreignKeys: [
          {
            name: "ForecastCity",

            referencedTableName:
              "cities",

            referencedColumnNames: [
              "id",
            ],

            columnNames: [
              "city_id",
            ],

            onDelete: "CASCADE",

            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.dropTable(
      "forecasts",
    );
  }
}