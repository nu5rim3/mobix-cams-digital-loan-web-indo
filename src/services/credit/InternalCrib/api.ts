
import { axiosInstance } from "../../config";

const api = axiosInstance

const getInternalCribByClientele = (id: string) => {
    return api.get(`/mobixCamsCredit/v1/credits/crib/internal/clienteles/${id}`)
}

export default {
    getInternalCribByClientele
}
