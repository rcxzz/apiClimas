import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class CreateCities1740000000001
  implements MigrationInterface
{
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: "cities",

        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "estado",
            type: "varchar",
          },
          {
            name: "pais",
            type: "varchar",
          },
          {
            name: "latitude",
            type: "decimal",
            precision: 10,
            scale: 7,
          },
          {
            name: "longitude",
            type: "decimal",
            precision: 10,
            scale: 7,
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
      }),
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.dropTable(
      "cities",
    );
  }
}