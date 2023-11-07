import {axiosInstance} from "../config";

const api = axiosInstance

const getAllCombinedStepsByAppraisalId = (id: string) => {
    return api.get(`/mobixCamsApproval/v1/approvals/combined-steps/${id}`)
}

const createScondMeetingStep = (data: any) => {
    return api.post(`/mobixCamsApproval/v1/approvals/second-meeting-steps`, data)
}

const createStep = (data: any) => {
    return api.post(`/mobixCamsApproval/v1/approvals/steps`, data)
}

export default {
    getAllCombinedStepsByAppraisalId,
    createScondMeetingStep,
    createStep
}