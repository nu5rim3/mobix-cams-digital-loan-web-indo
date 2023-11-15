
import {axiosInstance} from "../../config";
import { SlickUpdate } from "./types";

const api = axiosInstance

const getSlikRequestById = (id: string) => {
    return api.get(`/mobixCamsCredit/v1/sliks/slkIdx/${id}`)
}

const getSliksByBranchAndType = ({
    userId,
    branchCode,
    status,
    type
}: {
    userId: string,
    branchCode: string,
    status: 'P',
    type: 'GRPL' | 'IL'
}) => {
    return api.get(`/mobixCamsCredit/v1/sliks/${userId}/${branchCode}/${status}/${type}`)
}

const getSliksByGroupsAndCenter = ({
    userId,
    branchCode,
    group,
    center,
    status
}: {
    userId : string,
    branchCode: string,
    group: string,
    center: string,
    status: 'p'
}) => {
    return api.get(`/mobixCamsCredit/v1/sliks/${userId}/${branchCode}/${status}/${center}/${group}`)
}

const getSliksByStatus = ({
    userId,
    branchCode
}:{
    userId: string,
    branchCode: string
}) => { // this API provides status inprogress and completed sliks (this is status not slik status)
    return api.get(`/mobixCamsCredit/v1/sliks/${userId}/${branchCode}`)
}

const updateSlik = ({
    slikId,
    data
}: {
    slikId: string,
    data: any //SlickUpdate
} ) => { // this API provides status inprogress and completed sliks (this is status not slik status)
    return api.put(
        `/mobixCamsCredit/v1/sliks/${slikId}`,
        data
    )
}

const updateSlikBulck = (
    data:  SlickUpdate[]
 ) => { // this API provides status inprogress and completed sliks (this is status not slik status)
    return api.post(
        `/mobixCamsCredit/v1/sliks/bulk`,
        data
    )
}

export default {
    getSlikRequestById,
    getSliksByBranchAndType,
    getSliksByGroupsAndCenter,
    getSliksByStatus,
    updateSlik,
    updateSlikBulck
}

