import { AxiosResponse } from "axios";
import {axiosInstance} from "../../config";

const api = axiosInstance
// console.log("creating API", api)

const getMarketeersByUserName = (username: string) => {
    return api.get(`/mobixCamsCommon/v1/marketeers/${username}`)
}

export default {
    getMarketeersByUserName,
}

