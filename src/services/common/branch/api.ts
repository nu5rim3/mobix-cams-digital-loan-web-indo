
import {axiosInstance} from "../../config";

const api = axiosInstance

const getAllBranches = () => {
    return api.get('/mobixCamsCommon/v1/branches')
}

export default {
    getAllBranches,
}

