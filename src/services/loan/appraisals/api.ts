
import {axiosInstance} from "../../config";

const api = axiosInstance

const getAllAppraisals = () => {
    return api.get('/mobixCamsLoan/v1/appraisals/filters')
}

export default {
    getAllAppraisals,
}


