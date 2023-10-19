
import {axiosInstance} from "../../config";

const api = axiosInstance

const getAllRoles = () => {
    return api.get('/mobixCamsCommon/v1/roles')
}

export default {
    getAllRoles
}

