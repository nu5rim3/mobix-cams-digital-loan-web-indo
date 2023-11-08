import userServices from './common/user/api'
import branchServices from './common/branch/api'
import roleServices from './common/role/api'
import marketeerServices from './common/Marketeers/api'
import slikServices from './credit/sliks/api'
import appraisalsServices from './loan/appraisals/api'
import personServices from './stakeholder/person/api'
import stakeholderContact from './stakeholder/contact/api'
import stakeholderAddress from './stakeholder/address/api'
import stakeholderBussiness from './stakeholder/business/api'
import stakeholderSpouse from './stakeholder/spouse/api'
import stakeholderClientEles from './stakeholder/clientele/api'
import collateralServices from './credit/collateral/api'
import incomeExpencesServices from './credit/IncomeExpense/api'
import documentServices from './document/api'
import approvalServices from './approval/api'
import financialServices from './credit/FinanceApproval/api'
import productServices from './common/product/api'
import sectorServices from './common/sector/api'

export const API = {
    userServices,
    branchServices,
    roleServices,
    marketeerServices,
    slikServices,
    appraisalsServices,
    personServices,
    stakeholderContact,
    stakeholderAddress,
    stakeholderBussiness,
    stakeholderSpouse,
    stakeholderClientEles,
    collateralServices,
    incomeExpencesServices,
    documentServices,
    approvalServices,
    financialServices,
    productServices,
    sectorServices
}