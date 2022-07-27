import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Teste1658712892767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "teste",
                columns: [
                    {
                        name: "id",
                        type: "number",
                        isPrimary: true,
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("teste");
    }

}