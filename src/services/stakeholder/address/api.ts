
import {axiosInstance} from "../../config";

const api = axiosInstance

const getPersonAddressByIdAppraisalId = (id: string) => {
    return api.get(`/mobixCamsStakeholder/v1/addresses/appraisals/${id}`)
}


export default {
    getPersonAddressByIdAppraisalId
}

