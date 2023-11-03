import { UploadFile } from "antd/es/upload"

export interface AppDataStoreType {
    applications: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    customerData: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    contactDetails: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    addressDetails: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    spouseDetails: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    businessDetails: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    guarantorDetails: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    collateralDetails: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    cashFlowDetails: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    imageDetails: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    approvalSteps: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    },
    fileList: UploadFile[],
    financialDetails: {
        data: any | null,
        fetching : boolean,
        error: boolean | string
    },
    financialDetailsSavePending: boolean
}
