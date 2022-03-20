import { MigrationInterface, QueryRunner, Table, TableUnique, TableForeignKey } from 'typeorm'

export class createAccountAccessModulesMigration1647692685193 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'account_access_modules',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'account_id',
          type: 'uuid'
        },
        {
          name: 'access_profile_id',
          type: 'uuid'
        },
        {
          name: 'module_id',
          type: 'uuid'
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
          name: 'account_access_modules_uk01',
          columnNames: ['account_id', 'module_id']
        })
      ],
      foreignKeys: [
        new TableForeignKey({
          name: 'account_access_modules_fk01',
          columnNames: ['account_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'accounts',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'account_access_modules_fk02',
          columnNames: ['access_profile_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'access_profiles',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'account_access_modules_fk03',
          columnNames: ['module_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'modules',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('account_access_modules')
  }
}
