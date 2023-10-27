
import {axiosInstance} from "../../config";

const api = axiosInstance

const getPersonSpouseByIdAppraisalId = (id: string) => {
    return api.get(`/mobixCamsStakeholder/v1/spouses/appraisals/${id}`)
}


export default {
    getPersonSpouseByIdAppraisalId
}

