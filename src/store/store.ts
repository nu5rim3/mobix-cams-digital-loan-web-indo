import { bindActionCreators, configureStore } from "@reduxjs/toolkit";
import  SlikRequestsReducers, {slikActions} from "./slikRequests/slikRequest.slice";
import AppDataReducer , {AppDataActions} from './appData/appData.slice'

export const store = configureStore({
    reducer: {
        SlikRequest : SlikRequestsReducers,
        AppData: AppDataReducer
    }
})

export const actions = bindActionCreators(
    {
        ...slikActions,
        ...AppDataActions
    },
    store.dispatch
)

