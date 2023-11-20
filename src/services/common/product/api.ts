
import {axiosInstance} from "../../config";

const api = axiosInstance

const getProductByCode = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/products/${code}`)
}

const getMaritalStatusByCode = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/marital-statuses/${code}`)
}

const getAreaStatusByCode = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/areas/${code}`)
}

const getRelationByCode = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/relations/${code}`)
}

const getAllAreas = () => {
    return api.get(`/mobixCamsCommon/v1/areas`)
}





export default {
    getProductByCode,
    getMaritalStatusByCode,
    getAreaStatusByCode,
    getRelationByCode,
    getAllAreas
}

