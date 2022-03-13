import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createModuleMigration1647174732440 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'modules',
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
          name: 'description',
          type: 'varchar',
          length: '500',
          isNullable: true
        },
        {
          name: 'module_key',
          type: 'varchar',
          length: '100'
        },
        {
          name: 'enabled',
          type: 'boolean',
          default: true
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
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('modules')
  }
}
