/* eslint-disable no-useless-escape */
import 'module-alias/register'
import { ModuleModel } from '@/domain/authentication'
import { AuthenticationModuleAccessRules } from '@/infrastructure/authentication/constants'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class insertAuthenticationModuleAccessRulesMigration1647181119325 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const moduleList = await queryRunner.query(`
      select id 
        from modules
       where module_key = \'authentication_module\'
        `) as ModuleModel[]
    const module = moduleList[0]
    console.log(module)
    for (const accessRule of AuthenticationModuleAccessRules) {
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
    for (const accessRule of AuthenticationModuleAccessRules) {
      await queryRunner.query(`
        delete from module_access_rules 
        where rule_key = \'${accessRule.rule_key}\'
          and module_id = \'${module.id}\'
          `)
    }
  }
}
