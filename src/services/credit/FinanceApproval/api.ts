import {axiosInstance} from "../../config";

const api = axiosInstance

const getTcByAppraisals = (id: string) => {
    return api.get(`/mobixCamsCredit/v1/tc/appraisals/${id}`)
}

export default {
    getTcByAppraisals,
}
