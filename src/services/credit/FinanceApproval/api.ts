import {axiosInstance} from "../../config";

const api = axiosInstance

const getTcByAppraisals = (id: string) => {
    return api.get(`/mobixCamsCredit/v1/tc/appraisals/${id}`)
}

const saveTCByAppraisal = (id: string , cliId:string , data:any) => {
    return api.post(`/mobixCamsCredit/v1/tc/appraisals/${id}/clienteles/${cliId}`, data)
}

const calculateTc = (data:any) => {
    return api.post(`/mobixCamsCredit/v1/tc`, data)
}

const saveTCToFusion = (data:any) => {
    return api.post(`/mobixCamsCredit/v1/tc/fusion-details`, data)
}

// 

export default {
    getTcByAppraisals,
    saveTCByAppraisal,
    calculateTc,
    saveTCToFusion
}
