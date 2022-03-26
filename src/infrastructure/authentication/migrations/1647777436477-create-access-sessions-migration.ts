import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createAccessSessionsMigration1647777436477 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'access_sessions',
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
          name: 'access_session_modules',
          type: 'varchar'
        },
        {
          name: 'ip',
          type: 'varchar'
        },
        {
          name: 'deleted_at',
          type: 'timestamp with time zone',
          isNullable: true
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
          name: 'access_sessions_fk01',
          columnNames: ['account_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'accounts',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('access_sessions')
  }
}
