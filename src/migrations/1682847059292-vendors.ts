import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class vendors1682847059292 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vendors",
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
                        name: 'availability',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,        
                    },
                    {
                        name: 'level_of_assistance',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'daily_bill',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'experience',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isUnique: false,
                        isNullable: false,
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
            'vendors',
            new TableForeignKey({
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
            }),
          );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table "vendors"');
    }

}
