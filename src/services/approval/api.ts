import {axiosInstance} from "../config";

const api = axiosInstance

const getAllCombinedStepsByAppraisalId = (id: string) => {
    return api.get(`/mobixCamsApproval/v1/approvals/combined-steps/${id}`)
}

const createScondMeetingStep = (data: any) => {
    return api.get(`/mobixCamsApproval/v1/approvals/second-meeting-steps`, data)
}

export default {
    getAllCombinedStepsByAppraisalId,
    createScondMeetingStep
}