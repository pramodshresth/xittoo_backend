import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class services1682833231463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "services",
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
                        name: 'icon_url',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'icon_id',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    // {
                    //     name: 'vendor_id',
                    //     type: 'uuid',
                    //     isNullable: true,
                    // },
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

        // await queryRunner.createForeignKey(
        //     'services',
        //     new TableForeignKey({
        //       columnNames: ['vendor_id'],
        //       referencedColumnNames: ['id'],
        //       referencedTableName: 'vendor',
        //     }),
        //   );
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table "services"');
    }

}
