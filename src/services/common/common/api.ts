
import { axiosInstance } from "../../config";

const api = axiosInstance

const getVehicleType = (code: string) => {
    return api.get(`/mobixCamsCommon/v1/vehicle-types/${code}`)
}

const getVehicleModel = (code: string) => {
    // return api.get(`/mobixCamsCommon/v1/vehicle-models/manufacturers/${code}`)
    return api.get(`/mobixCamsCommon/v1/vehicle-models/${code}`)
}

const getMorgeType = (code: string) => {
    // return api.get(`/mobixCamsCommon/v1/vehicle-models/manufacturers/${code}`)
    return api.get(`/mobixCamsCommon/v1/morg-types/${code}`)
}

const getSecurityCat = (code: string) => {
    // return api.get(`/mobixCamsCommon/v1/vehicle-models/manufacturers/${code}`)
    return api.get(`/mobixCamsCommon/v1/security-categories/${code}`)
}

const getSecurityOwnType = (code: string) => {
    // return api.get(`/mobixCamsCommon/v1/vehicle-models/manufacturers/${code}`)
    return api.get(`/mobixCamsCommon/v1/security-own-types/${code}`)
}

const getOwnership = (code: string) => {
    // return api.get(`/mobixCamsCommon/v1/vehicle-models/manufacturers/${code}`)
    return api.get(`/mobixCamsCommon/v1/ownership-types/${code}`)
}

const getCertificateType = (code: string) => {
    // return api.get(`/mobixCamsCommon/v1/vehicle-models/manufacturers/${code}`)
    return api.get(`/mobixCamsCommon/v1/certificate-types/${code}`)
}

const getReasonByCode = (code: string) => {

    return api.get(`/mobixCamsCommon/v1/reasons/${code}`)
}


export default {
    getOwnership,
    getVehicleType,
    getVehicleModel,
    getMorgeType,
    getSecurityCat,
    getSecurityOwnType,
    getCertificateType
}

