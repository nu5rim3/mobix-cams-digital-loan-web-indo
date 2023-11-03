
import {axiosInstance} from "../../config";

const api = axiosInstance

const getPersonclientelesByAppraisalId = (id: string) => {
    return api.get(`/mobixCamsStakeholder/v1/clienteles/appraisals/${id}`)
}


export default {
    getPersonclientelesByAppraisalId
}

