
import {axiosInstance} from "../../config";

const api = axiosInstance

const getSectorByCode = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/sectors/${code}`)
}

const getSubSectorByCode = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/sub-sectors/${code}`)
}

export default {
    getSectorByCode,
    getSubSectorByCode
}

