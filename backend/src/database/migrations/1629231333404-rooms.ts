import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class rooms1629231333404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'rooms',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'nameShow',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'campus',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'latitude',
                    type: 'numeric',
                    isNullable: true,
                },
                {
                    name: 'longitude',
                    type: 'numeric',
                    isNullable: true,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'link',
                    type: 'varchar',
                    isNullable: true,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rooms');
    }

}
