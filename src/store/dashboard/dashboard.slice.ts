import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDataStoreType } from "./interface";
import { API } from "../../services/Services";
import { AxiosError } from "axios";

export const initialState: AppDataStoreType = {
    usersData : {
        fetching: false,
        error: false,
        data: null
    }
};

export const getAllUsersData = createAsyncThunk(
    'DashboardDataDetails/fetchAllUsersData',
    async ({}, thunkAPI) => {
        try{
            const response = await API.userServices.getAllUsers()
            return response.data
        }
        catch(error){
            const er = error as AxiosError
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  )

export const DashboardDataSlice = createSlice({
    name: "DashboardDataDetails",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsersData.pending , (state, action) => {
            state.usersData.fetching = true
        }),
        builder.addCase(getAllUsersData.fulfilled , (state, action) => {
            state.usersData.fetching = false
            state.usersData.data = action.payload
        })
    }
});

export const dashboardAsyncActions = DashboardDataSlice.actions

export const DashboardDataActions = {
    ...dashboardAsyncActions,
    getAllUsersData
}

export default DashboardDataSlice.reducer;