import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDataStoreType } from "./interface";
import { API } from "../../services/Services";
import { AxiosError } from "axios";

export const initialState: AppDataStoreType = {
    userData : {
        fetching: false,
        error: false,
        data: null
    }
};

export const getUserDataById = createAsyncThunk(
    'AppDataDetails/fetchUserData',
    async (userId: string, thunkAPI) => {
        console.log("status", userId)
        try{
            const response = await API.userServices.getUserById(userId)
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

export const SlikRequestsSlice = createSlice({
    name: "AppDataDetails",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserDataById.pending , (state, action) => {
            state.userData.fetching = true
        }),
        builder.addCase(getUserDataById.fulfilled , (state, action) => {
            state.userData.fetching = false
            state.userData.data = action.payload
        })
    }
});

export const appDataAsyncActions = SlikRequestsSlice.actions

export const AppDataActions = {
    ...appDataAsyncActions,
    getUserDataById
}

export default SlikRequestsSlice.reducer;