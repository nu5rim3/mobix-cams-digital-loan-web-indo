
import {axiosInstance} from "../../config";

const api = axiosInstance

const getProductByCode = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/products/${code}`)
}


export default {
    getProductByCode
}

