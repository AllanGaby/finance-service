/* eslint-disable no-useless-escape */
import 'module-alias/register'
import { ModuleModel } from '@/domain/authentication'
import { CommonModuleAccessRules } from '@/infrastructure/common/constants'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class insertCommonModuleAccessRulesMigration1648384487666 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const moduleList = await queryRunner.query(`
      select id 
        from modules
       where module_key = \'authentication_module\'
        `) as ModuleModel[]
    const module = moduleList[0]
    for (const accessRule of CommonModuleAccessRules) {
      await queryRunner.query(`
        insert into module_access_rules (module_id, title, rule_key) 
          values (\'${module.id}\',\'${accessRule.title}\', \'${accessRule.rule_key}\')
          `)
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const moduleList = await queryRunner.query(`
      select id 
        from modules
       where module_key = \'authentication_module\'
        `) as ModuleModel[]
    const module = moduleList[0]
    for (const accessRule of CommonModuleAccessRules) {
      await queryRunner.query(`
        delete from module_access_rules 
        where rule_key = \'${accessRule.rule_key}\'
          and module_id = \'${module.id}\'
          `)
    }
  }
}
