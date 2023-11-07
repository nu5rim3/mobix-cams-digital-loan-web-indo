export interface AppDataStoreType {
    userData: {
        data: {} | null,
        fetching : boolean,
        error: boolean | string
    }
    selectedRole: null | {},
    token: null | string
}
