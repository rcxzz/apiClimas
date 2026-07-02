import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class CreateTrainers1740000000000
  implements MigrationInterface
{
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: "trainers",

        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "city_origin",
            type: "varchar",
          },
          {
            name: "age",
            type: "int",
          },
          {
            name: "badges",
            type: "int",
          },
          {
            name: "trainer_level",
            type: "int",
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
      "trainers",
    );
  }
}