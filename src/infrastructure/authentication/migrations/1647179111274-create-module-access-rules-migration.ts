import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createModuleAccessRulesMigration1647179111274 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'module_access_rules',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'title',
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
          name: 'rule_key',
          type: 'varchar',
          length: '100'
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
          name: 'module_access_rules_fk01',
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
    await queryRunner.dropTable('module_access_rules')
  }
}
