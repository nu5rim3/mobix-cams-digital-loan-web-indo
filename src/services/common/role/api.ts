import { AxiosResponse } from "axios";
import {axiosInstance} from "../../config";

const api = axiosInstance
// console.log("creating API", api)

const getAllRoles = () => {
    return api.get('/mobixCamsCommon/v1/roles')
}

export default {
    getAllRoles
}

