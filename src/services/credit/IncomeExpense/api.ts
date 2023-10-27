import {axiosInstance} from "../../config";

const api = axiosInstance

const getAllCollateralsByAppraisals = (id: string) => {
    return api.get(`/mobixCamsCredit/v1/cash-flows/${id}`)
}

export default {
    getAllCollateralsByAppraisals,
}
