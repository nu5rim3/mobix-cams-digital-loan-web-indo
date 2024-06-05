
import {axiosInstance} from "../../config";

const api = axiosInstance

const getPersonclientelesByAppraisalId = (id: string) => {
    return api.get(`/mobixCamsStakeholder/v1/clienteles/appraisals/${id}`)
}

const getCentersByCode = (code: string) => {
    return api.get(`/mobixCamsStakeholder/v1/centers/center-code/${code}`)
}


export default {
    getPersonclientelesByAppraisalId,
    getCentersByCode
}

