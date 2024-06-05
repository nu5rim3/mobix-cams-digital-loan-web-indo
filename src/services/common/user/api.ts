
import {axiosInstance} from "../../config";

const api = axiosInstance

const getAllUsers = () => {
    return api.get('/mobixCamsCommon/v1/users')
}

const getUserById = (id: string) => {
    return api.get(`/mobixCamsCommon/v1/users/${id}`)
}

const addUser = (data:any) => {
    return api.post(`/mobixCamsCommon/v1/users`, data)
}

const updateUser = (data:any, id: string) => {
    return api.put(`/mobixCamsCommon/v1/users/${id}`, data)
}

const resetPassword = (data:any) => {
    return api.post(`/mobixCamsCommon/v1/users/reset-passwords`, data)
}



export default {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    resetPassword
}

