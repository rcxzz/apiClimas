import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class CreatePokemons1740000000001
  implements MigrationInterface
{
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: "pokemons",

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
            name: "type",
            type: "varchar",
          },
          {
            name: "level",
            type: "int",
          },
          {
            name: "hp",
            type: "int",
          },
          {
            name: "rarity",
            type: "varchar",
          },
          {
            name: "trainer_id",
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
            name: "PokemonTrainer",

            referencedTableName:
              "trainers",

            referencedColumnNames: [
              "id",
            ],

            columnNames: [
              "trainer_id",
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
      "pokemons",
    );
  }
}