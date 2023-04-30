import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class details1682039251377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'userssssss',
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
                  name: 'username',
                  type: 'varchar',
                  isUnique: true,
                  isNullable: true,
                },
                {
                  name: 'first_name',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: false,
                },
                {
                  name: 'last_name',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: false,
                },
                {
                  name: 'password',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'status',
                  type: 'varchar',
                  default: "'ACTIVE'",
                },
                {
                  name: 'role',
                  type: 'varchar',
                  default: "'USER'",
                },
                {
                  name: 'social_id',
                  type: 'varchar',
                  isNullable: true,
                },
                //generic entity
              
              ],
            }),
            true,
          );
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
