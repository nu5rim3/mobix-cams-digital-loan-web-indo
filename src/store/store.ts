import { bindActionCreators, configureStore } from "@reduxjs/toolkit";
import  SlikRequestsReducers, {slikActions} from "./slikRequests/slikRequest.slice";
import AppDataReducer , {AppDataActions} from './appData/appData.slice'
import ApplicationReducer, {ApplicationActions} from './application/application.slice'
import DashboardReducer, {DashboardDataActions} from './dashboard/dashboard.slice'

export const store = configureStore({
    reducer: {
        SlikRequest : SlikRequestsReducers,
        AppData: AppDataReducer,
        Application: ApplicationReducer,
        DashboardData: DashboardReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // }),
})

export const actions = bindActionCreators(
    {
        ...slikActions,
        ...AppDataActions,
        ...ApplicationActions,
        ...DashboardDataActions
    },
    store.dispatch
)

