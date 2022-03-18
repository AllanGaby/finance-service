import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createAccessProfileRulesMigration1647615554404 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'access_profile_rules',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'access_profile_id',
          type: 'uuid'
        },
        {
          name: 'module_access_rule_id',
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
          name: 'access_profile_rules_fk01',
          columnNames: ['access_profile_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'access_profiles',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'access_profile_rules_fk02',
          columnNames: ['module_access_rule_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'module_access_rules',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('access_profile_rules')
  }
}
