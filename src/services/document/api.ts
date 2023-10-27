import {axiosInstance, axiosFileInstance} from "../config";

const api = axiosInstance
const apiFile = axiosFileInstance

const getAllDocumentsByAppraisalId = (id: string) => {
    return api.get(`/mobixCamsDocument/v1/documents/appraisals/${id}`)
}

const viewDocumentByHash = (hashValue: string) => {
    return apiFile.get(`/mobixCamsDocument/v1/documents/static-assets/${hashValue}`)
}

const viewDocumentByHashImage = (hashValue: string) => {
    return (`/mobixCamsDocument/v1/documents/static-assets/${hashValue}`)
}

export default {
    getAllDocumentsByAppraisalId,
    viewDocumentByHash,
    viewDocumentByHashImage
}