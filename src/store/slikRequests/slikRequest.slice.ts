import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SlikRequestsStoreType } from "./interface";
import { API } from "../../services/Services";
import { Axios, AxiosError } from "axios";
import { notification } from "antd";

export const initialState: SlikRequestsStoreType = {
    selectedStatus: 'pending',
    selectedType : 'group',
    slikRequestsGroupData: {
        initialData: [],
        data: [],
        fetching: false,
        error: false,
    },
    slikRequestsIndividualData: {
        data: [],
        fetching: false,
        error: false
    },
    slikRequestsData: {
        data: [],
        fetching: false,
        error: false
    },
    slikUpdateUserData: {
        selectedUser: null,
        fetching: false,
        initialData: null,
        updateData: null
    },
    bulkUploadBatch: {
        uploadLoading: false,
        uploadSuccess: false,
        uploadError: false
    }

};

export const getSlikRequests = createAsyncThunk(
    'SlickRequestsDetails/fetchByStatus',
    async (arg: Parameters<typeof API.slikServices.getSliksByStatus>[0], thunkAPI) => {
        try{
            const response = await API.slikServices.getSliksByStatus(arg)
            console.log("arg reee", response)
            const modify = response.data.map((row: any) => {
                return {
                    ...row,
                    ...row.slikDto
                }
            })
            return response.data
        }
        catch(error){
            const er = error as any
            notification.error({message : 
                er?.response?.data?.message?? 
                er.message?? 
                'Data Fetching Error'
            })
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  )

export const getSlikRequestData = createAsyncThunk(
    'SlickRequestsDetails/fetchById',
    async (id: Parameters<typeof API.slikServices.getSlikRequestById>[0] , thunkAPI) => {
        try{
            const response = await API.slikServices.getSlikRequestById(id)
            return response.data
        }
        catch(error){
            const er = error as any
            notification.error({message : 
                er?.response?.data?.message?? 
                er.message?? 
                'Data Fetching Error'
            })

            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  )

  export const getSlikByIndividual = createAsyncThunk(
    'SlickRequestsDetails/fetchByIndividual',
    async (arg:  Parameters<typeof API.slikServices.getSliksByBranchAndType>[0] , thunkAPI) => {
        try{
            const response = await API.slikServices.getSliksByBranchAndType(arg)

            // Your data
            const modifyData = response.data.map((row:any) => {
                return({
                    ...row,
                    ...row.slikDto
                })
            })
            const data = modifyData.filter((row: any) => row.status === 'P')
            return data
            // return response.data
        }
        catch(error){
            const er = error as any
            notification.error({message : 
                er?.response?.data?.message?? 
                er.message?? 
                'Data Fetching Error'
            })
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  )

  export const getSlikByGroup = createAsyncThunk(
    'SlickRequestsDetails/fetchByGroup',
    async (arg:  Parameters<typeof API.slikServices.getSliksByBranchAndType>[0], thunkAPI) => {
        try{
            const response = await API.slikServices.getSliksByBranchAndType(arg)

            const modifyData = response.data.map((row:any) => {
                return({
                    ...row,
                    ...row.slikDto
                })
            })

            // Your data
            const data = modifyData.filter((row: any) => row.status === 'P')
  
  // Create an object to store the counts for each group
        const groupCounts:any = {};
  
  // Loop through the data to count the records in each group
        data.forEach((item: any) => {
            const centerCode = item.centerCode || "Unknown";
            const groupIdx = item.groupIdx || "Unknown";
        
            const key = `${centerCode}-${groupIdx}`;
        
            if (!groupCounts[key]) {
            groupCounts[key] = {
                count : 1,
                centerCode: centerCode,
                groupIdx : groupIdx,
                customerName : item.customerName,
                creationDate : item.creationDate
            };
            }else{
                groupCounts[key] = {
                    count : groupCounts[key].count + 1,
                    centerCode: centerCode,
                    groupIdx : groupIdx,
                    customerName : item.customerName,
                    creationDate : item.creationDate
                };
            }
        });
  
        // Create a new array based on centerCode, groupIdx, and record count
        const newData = Object.keys(groupCounts).map(key => {
            return groupCounts[key];
        });

        return {newData, data}
        
    }
        catch(error){
            const er = error as any
            notification.error({message : 
                er?.response?.data?.message?? 
                er.message?? 
                'Data Fetching Error'
            })

            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  )

export const SlikRequestsSlice = createSlice({
    name: "SlickRequestsDetails",
    initialState: initialState,
    reducers: {
        SRchangeStatus: (state, action: PayloadAction<'pending' | 'inprogress' | 'completed'>) => {
            state = { 
                ...state, 
                selectedStatus : action.payload
            };
            return state;
        },
        SRchangeType: (state, action: PayloadAction<'group' | 'individual'>) => {
            state = { 
                ...state, 
                selectedType : action.payload
            };
            return state;
        },
        editIndividualData: (state, action: any) => {
            state = { 
                ...state, 
                slikRequestsIndividualData : {
                    data: action.payload,
                    fetching: false,
                    error: false
                }
            };
            return state;
        },
        resetSlikRequestsStore: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getSlikRequests.pending , (state, action) => {
            state.slikRequestsData.fetching = true
        }),
        builder.addCase(getSlikRequests.fulfilled , (state, action) => {
            state.slikRequestsData.fetching = false
            state.slikRequestsData.data = action.payload
        }),
        builder.addCase(getSlikRequests.rejected , (state, action) => {
            state.slikRequestsData.fetching = false
        }),
        builder.addCase(getSlikRequestData.pending , (state, action) => {
            state.slikUpdateUserData.selectedUser = action.meta.arg
            state.slikUpdateUserData.fetching = true
        }),
        builder.addCase(getSlikRequestData.fulfilled , (state, action) => {
            state.slikUpdateUserData.fetching = false
            state.slikUpdateUserData.initialData = action.payload
        }),
        builder.addCase(getSlikRequestData.rejected , (state, action) => {
            state.slikUpdateUserData.fetching = false
        }),
        builder.addCase(getSlikByGroup.pending , (state, action) => {
            state.slikRequestsGroupData.fetching = true
            state.slikRequestsGroupData.initialData = []
        }),
        builder.addCase(getSlikByGroup.fulfilled , (state, action) => {
            state.slikRequestsGroupData.fetching = false
            state.slikRequestsGroupData.data = action.payload.newData
            state.slikRequestsGroupData.initialData = action.payload.data
        }),
        builder.addCase(getSlikByGroup.rejected , (state, action) => {
            state.slikRequestsGroupData.fetching = false
        }),
        builder.addCase(getSlikByIndividual.pending , (state, action) => {
            state.slikRequestsIndividualData.data = []
            state.slikRequestsIndividualData.fetching = true
        }),
        builder.addCase(getSlikByIndividual.fulfilled , (state, action) => {
            state.slikRequestsIndividualData.fetching = false
            state.slikRequestsIndividualData.data = action.payload
        })
        builder.addCase(getSlikByIndividual.rejected , (state, action) => {
            state.slikRequestsIndividualData.fetching = false
        })
    }
});

export const slikAsyncActions = SlikRequestsSlice.actions

export const slikActions = {
    ...slikAsyncActions,
    getSlikRequestData,
    getSlikRequests,
    getSlikByGroup,
    getSlikByIndividual
}

export default SlikRequestsSlice.reducer;