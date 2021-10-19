"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImages1630321310843 = void 0;
const typeorm_1 = require("typeorm");
class createImages1630321310843 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'room_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageRoom',
                    columnNames: ['room_id'],
                    referencedTableName: 'rooms',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('images');
    }
}
exports.createImages1630321310843 = createImages1630321310843;
