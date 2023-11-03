
import {axiosInstance} from "../../config";

const api = axiosInstance

const getPersonByIdAppraisalId = (id: string) => {
    return api.get(`/mobixCamsStakeholder/v1/stakeholders/appraisals/${id}`)
}


export default {
    getPersonByIdAppraisalId
}

