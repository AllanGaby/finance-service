import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm'

export class createAccountsMigration1647641722389 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'accounts',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar',
          length: '100'
        },
        {
          name: 'email',
          type: 'varchar',
          length: '100'
        },
        {
          name: 'identification',
          type: 'varchar',
          length: '100',
          isNullable: true
        },
        {
          name: 'password',
          type: 'varchar',
          length: '100'
        },
        {
          name: 'account_hash',
          type: 'varchar',
          length: '100'
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()'
        }
      ],
      uniques: [
        new TableUnique({
          name: 'accounts_uk01',
          columnNames: ['email']
        }),
        new TableUnique({
          name: 'accounts_uk02',
          columnNames: ['identification']
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts')
  }
}
