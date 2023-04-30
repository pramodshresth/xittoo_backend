import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class $npmConfigName1681959482427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'vendor',
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
                  isNullable: false,
                },
                {
                  name: 'level_of_assistance',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'daily_bill',
                  type: 'varchar',
             
                },
                {
                  name: 'experience',
                  type: 'varchar',
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
              ],
            }),
            true,
          );

          await queryRunner.addColumn(
            'vendor',
            new TableColumn({
              name: 'user_id',
              type: 'uuid',
            }),
          );

          await queryRunner.createForeignKey(
            'vendor',
            new TableForeignKey({
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
                        
            }),
          );
      
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
