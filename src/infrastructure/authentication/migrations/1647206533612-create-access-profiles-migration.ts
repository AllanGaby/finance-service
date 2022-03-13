import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createAccessProfilesMigration1647206533612 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'access_profiles',
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
          name: 'enabled',
          type: 'boolean',
          default: true
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
      foreignKeys: [
        new TableForeignKey({
          name: 'access_profiles_fk01',
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
    await queryRunner.dropTable('access_profiles')
  }
}
