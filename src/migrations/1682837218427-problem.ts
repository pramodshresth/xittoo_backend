import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class problem1682837218427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "problems",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,        
                    },
                    {
                        name: 'per_price',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'image_url',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'image_id',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'facilate_charge',
                        type: 'NUMERIC',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'service_id',
                        type: 'uuid',
                        isUnique: false,
                        isNullable: false,
            
                    },
                    {
                        name: 'brand',
                        type: 'TEXT[]',
                    },
                    //generic entity
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ]
            }),
            true
        );
        await queryRunner.createForeignKey(
            'problems',
            new TableForeignKey({
              columnNames: ['service_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'services',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table "problems"');
    }

}
