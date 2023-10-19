
import {axiosInstance} from "../../config";

const api = axiosInstance

const getMarketeersByUserName = (username: string) => {
    return api.get(`/mobixCamsCommon/v1/marketeers/${username}`)
}

export default {
    getMarketeersByUserName,
}

