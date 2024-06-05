
import { axiosInstance } from "../../config";

const api = axiosInstance

const getAllReasons = () => {
    return api.get('/mobixCamsCommon/v1/reasons')
}

export default {
    getAllReasons
}
