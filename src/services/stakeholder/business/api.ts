
import {axiosInstance} from "../../config";

const api = axiosInstance

const getPersonBusinessByIdAppraisalId = (id: string) => {
    return api.get(`/mobixCamsStakeholder/v1/businesses/appraisals/${id}`)
}


export default {
    getPersonBusinessByIdAppraisalId
}

