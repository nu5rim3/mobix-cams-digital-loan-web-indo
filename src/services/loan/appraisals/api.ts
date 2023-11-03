
import {axiosInstance} from "../../config";

const api = axiosInstance

const getAllAppraisals = (
    data: any
    ) => {
        console.log("yeye", data)
    return api.get('/mobixCamsLoan/v1/appraisals/filters', {
        params: data
    })
}

export default {
    getAllAppraisals,
}


