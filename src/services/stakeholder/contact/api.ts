
import {axiosInstance} from "../../config";

const api = axiosInstance

const getPersonContactByIdAppraisalId = (id: string) => {
    return api.get(`/mobixCamsStakeholder/v1/contacts/appraisals/${id}`)
}


export default {
    getPersonContactByIdAppraisalId
}

