import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1682006247244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'users',
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
                  isUnique: false,
                  isNullable: true,
                },
                {
                  name: 'password',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: false,
                },
                {
                  name: 'phone',
                  type: 'varchar',
                  isUnique: true,
                  isNullable: false,
                },
                {
                  name: 'profile_url',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: true,
                },
                {
                  name: 'gender',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'address',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'reward_points',
                  type: 'NUMERIC',
                  default: 0,
                  isNullable: false,
                },
                {
                  name: 'role',
                  type: 'varchar',
                  default: "'user'",
                },
                {
                  name: 'district',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'invite_code',
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
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table "user"');
    }

}
