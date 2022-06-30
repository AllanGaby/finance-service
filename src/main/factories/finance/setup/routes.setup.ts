import { Router } from 'express'
import {
  CompanyRouteProps,
  CompanyTypeRouteProps,
  FinanceAccountRouteProps,
  FinanceTransactionRouteProps,
  FinanceTransactionTagRouteProps,
  TransactionCategoryRouteProps,
  TransactionTagRouteProps,
  makeCompanyRoute,
  makeCompanyTypeRoute,
  makeFinanceAccountRoute,
  makeFinanceTransactionRoute,
  makeFinanceTransactionTagRoute,
  makeTransactionCategoryRoute,
  makeTransactionTagRoute
} from '@/main/factories/finance'

export type FinanceRouteProps =
CompanyRouteProps &
CompanyTypeRouteProps &
FinanceAccountRouteProps &
FinanceTransactionRouteProps &
FinanceTransactionTagRouteProps &
TransactionCategoryRouteProps &
TransactionTagRouteProps

export const FinanceModuleRoute = async (props: FinanceRouteProps): Promise<Router> =>
  Router()
    .use('/company', makeCompanyRoute(props))
    .use('/company-type', makeCompanyTypeRoute(props))
    .use('/finance-account', makeFinanceAccountRoute(props))
    .use('/finance-transaction', makeFinanceTransactionRoute(props))
    .use('/finance-transaction-tag', makeFinanceTransactionTagRoute(props))
    .use('/transaction-category', makeTransactionCategoryRoute(props))
    .use('/transaction-tag', makeTransactionTagRoute(props))
