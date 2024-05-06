import { axiosInstance } from "../../config";

const api = axiosInstance

const getAllCollateralsByAppraisals = (id: string) => {
    return api.get(`/mobixCamsCredit/v1/cash-flows/${id}`)
}
const saveCashFlow = (id: string, data: any) => {
    
    return api.post(`/mobixCamsCredit/v1/cash-flows/${id}`, data)
}
const updateCashFlow = (id: string, data: any) => {

    return api.post(`/mobixCamsCredit/v1/cash-flows-updates/${id}`, data)
}
const getCashFlowByRole = (id: string, role: string) => {
    return api.get(`/mobixCamsCredit/v1/cash-flows/${id}/roles/${role}`)
}
export default {
    getAllCollateralsByAppraisals,
    saveCashFlow,
    updateCashFlow,
    getCashFlowByRole
}
