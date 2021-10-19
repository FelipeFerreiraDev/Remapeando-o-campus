"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rooms1629231333404 = void 0;
const typeorm_1 = require("typeorm");
class rooms1629231333404 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('rooms');
    }
}
exports.rooms1629231333404 = rooms1629231333404;
