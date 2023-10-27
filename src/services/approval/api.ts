import {axiosInstance} from "../config";

const api = axiosInstance

const getAllCombinedStepsByAppraisalId = (id: string) => {
    return api.get(`/mobixCamsApproval/v1/approvals/combined-steps/${id}`)
}
export default {
    getAllCombinedStepsByAppraisalId
}