
import {axiosInstance} from "../../config";

const api = axiosInstance

const getProductByCode = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/products/${code}`)
}

const getMaritalStatusByCode = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/marital-statuses/${code}`)
}


export default {
    getProductByCode,
    getMaritalStatusByCode
}

