
import {axiosInstance} from "../../config";

const api = axiosInstance

const getAllAppraisals = (
    data: any
    ) => {
    return api.get('/mobixCamsLoan/v1/appraisals/filters', {
        params: data
    })
}

const getSecondMeetingAppraisals = (
    data: any
    ) => {
    return api.get('/mobixCamsLoan/v1/appraisals/second-meetings/filters', {
        params: data
    })
}

export default {
    getAllAppraisals,
    getSecondMeetingAppraisals
}


