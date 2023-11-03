import {axiosInstance} from "../../config";

const api = axiosInstance

const getAllCollateralsByAppraisals = (id: string) => {
    return api.get(`/mobixCamsCredit/v1/collaterals/appraisals/${id}`)
}

export default {
    getAllCollateralsByAppraisals,
}
