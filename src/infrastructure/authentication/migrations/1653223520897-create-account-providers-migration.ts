import 'module-alias/register'
import { AuthenticationProvider } from '@/domain/authentication'
import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm'

export class createAccountProvidersMigration1653223520897 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'account_providers',
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
          name: 'account_provider_id',
          type: 'varchar'
        },
        {
          name: 'provider',
          type: 'enum',
          enumName: 'account_providers_en01',
          enum: Object.values(AuthenticationProvider)
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
          name: 'account_providers_uk01',
          columnNames: ['account_id', 'provider']
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('account_providers')
  }
}
