import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class otp1682831953394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "otp",
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
                        name: 'phone_number',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: 'otp',
                        type: 'varchar',
                        isUnique: false,
                        isNullable: false,
                    },
                    //generic entity
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
