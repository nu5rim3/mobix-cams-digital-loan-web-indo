export interface AppDataStoreType {
    usersData: {
        data: [] | null,
        fetching : boolean,
        error: boolean | string
    }
}
