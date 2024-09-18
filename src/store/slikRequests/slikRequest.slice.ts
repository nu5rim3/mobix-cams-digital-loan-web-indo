/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SlikRequestsStoreType } from "./interface";
import { API } from "../../services/Services";
import { notification } from "antd";
import { handleApiError } from "../../utils/errorHandler";

export const initialState: SlikRequestsStoreType = {
  selectedStatus: "pending",
  selectedType: "group",
  slikRequestsGroupData: {
    initialData: [],
    data: [],
    fetching: false,
    error: false,
  },
  slikExcelData: {
    data: [],
    fetching: false,
    error: false,
  },
  slikRequestsIndividualData: {
    data: [],
    fetching: false,
    error: false,
  },
  slikRequestsPaginatedData: {
    data: null,
    fetching: false,
    error: false,
  },
  slikRequestsGroupPaginatedData: {
    data: null,
    fetching: false,
    error: false,
  },
  innerSlikRequestsGroupPaginatedData: {
    data: null,
    fetching: false,
    error: false,
  },
  slikRequestsData: {
    data: [],
    fetching: false,
    error: false,
  },
  slikUpdateUserData: {
    selectedUser: null,
    fetching: false,
    initialData: null,
    updateData: null,
  },
  bulkUploadBatch: {
    uploadLoading: false,
    uploadSuccess: false,
    uploadError: false,
  },
  selectedBranch: "",
};

export const getSlikRequests = createAsyncThunk(
  "SlickRequestsDetails/fetchByStatus",
  async (
    arg: Parameters<typeof API.slikServices.getSliksByStatus>[0],
    thunkAPI
  ) => {
    try {
      const response = await API.slikServices.getSliksByStatus(arg);
      const modify = response.data.map((row: any) => {
        return {
          ...row,
          ...row.slikDto,
        };
      });
      return modify;
    } catch (error) {
      const er = error as any;
      const errorMessage = handleApiError(error);
      notification.error({
        message: errorMessage ?? er.message ?? "Data Fetching Error",
      });
      return er?.response
        ? thunkAPI.rejectWithValue(er?.response.data)
        : thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const getSlikRequestData = createAsyncThunk(
  "SlickRequestsDetails/fetchById",
  async (
    id: Parameters<typeof API.slikServices.getSlikRequestById>[0],
    thunkAPI
  ) => {
    try {
      const response = await API.slikServices.getSlikRequestById(id);
      return {
        ...response.data,
        ...response.data.slikDto,
      };
    } catch (error) {
      const er = error as any;
      const errorMessage = handleApiError(error);
      notification.error({
        message: errorMessage ?? er.message ?? "Data Fetching Error",
      });
      return er?.response
        ? thunkAPI.rejectWithValue(er?.response.data)
        : thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const getExcelSlikRequestData = createAsyncThunk(
  "SlickExcelRequestsDetails/fetchByGroup",
  async (
    arg: Parameters<typeof API.slikServices.getExcelSlikData>[0],
    thunkAPI
  ) => {
    try {
      const response = await API.slikServices.getExcelSlikData(arg);
      return response.data;
    } catch (error) {
      const er = error as any;
      const errorMessage = handleApiError(error);
      notification.error({
        message: errorMessage ?? er.message ?? "Data Fetching Error",
      });
      return er?.response
        ? thunkAPI.rejectWithValue(er?.response.data)
        : thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const getSliksWithPagination = createAsyncThunk(
  "SlickRequestsDetails/getSliksWithPagination",
  async (
    arg: Parameters<typeof API.slikServices.getSliksWithPagination>[0],
    thunkAPI
  ) => {
    try {
      const response = await API.slikServices.getSliksWithPagination(arg);
      return response.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const er = error as any;
      const errorMessage = handleApiError(error);
      notification.error({
        message: errorMessage ?? er.message ?? "Data Fetching Error",
      });
      return er?.response
        ? thunkAPI.rejectWithValue(er?.response.data)
        : thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const getSlikGroupWithPagination = createAsyncThunk(
  "SlickRequestsDetails/getSlikGroupWithPagination",
  async (
    arg: Parameters<typeof API.slikServices.getSlikGroupWithPagination>[0],
    thunkAPI
  ) => {
    try {
      const response = await API.slikServices.getSlikGroupWithPagination(arg);
      return response.data;
    } catch (error) {
      const er = error as any;
      const errorMessage = handleApiError(error);
      notification.error({
        message: errorMessage ?? er.message ?? "Data Fetching Error",
      });
      return er?.response
        ? thunkAPI.rejectWithValue(er?.response.data)
        : thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const getInnerSliksGroupWithPagination = createAsyncThunk(
  "SlickRequestsDetails/getInnerSliksGroupWithPagination",
  async (
    arg: Parameters<
      typeof API.slikServices.getGroupInnerSliksWithPagination
    >[0],
    thunkAPI
  ) => {
    try {
      const response = await API.slikServices.getGroupInnerSliksWithPagination(
        arg
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const er = error as any;
      const errorMessage = handleApiError(error);
      notification.error({
        message: errorMessage ?? er.message ?? "Data Fetching Error",
      });
      return er?.response
        ? thunkAPI.rejectWithValue(er?.response.data)
        : thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const getSlikByIndividual = createAsyncThunk(
  "SlickRequestsDetails/fetchByIndividual",
  async (
    arg: Parameters<typeof API.slikServices.getSliksByBranchAndType>[0],
    thunkAPI
  ) => {
    try {
      const response = await API.slikServices.getSliksByBranchAndType(arg);

      // Your data
      const modifyData = response.data.map((row: any) => {
        return {
          ...row,
          ...row.slikDto,
        };
      });
      const data = modifyData.filter((row: any) => row.status === "P");
      return data;
      // return response.data
    } catch (error) {
      const er = error as any;
      const errorMessage = handleApiError(error);
      notification.error({
        message: errorMessage ?? er.message ?? "Data Fetching Error",
      });
      return er?.response
        ? thunkAPI.rejectWithValue(er?.response.data)
        : thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const getSlikByGroup = createAsyncThunk(
  "SlickRequestsDetails/fetchByGroup",
  async (
    arg: Parameters<typeof API.slikServices.getSliksByBranchAndType>[0],
    thunkAPI
  ) => {
    try {
      const response = await API.slikServices.getSliksByBranchAndType(arg);

      const modifyData = response.data.map((row: any) => {
        return {
          ...row,
          ...row.slikDto,
        };
      });

      // Your data
      const data = modifyData.filter((row: any) => row.status === "P");

      // Create an object to store the counts for each group
      const groupCounts: any = {};

      // Loop through the data to count the records in each group
      data.forEach((item: any) => {
        const centerCode = item.centerCode || "Unknown";
        const groupIdx = item.groupIdx || "Unknown";

        const key = `${centerCode}-${groupIdx}`;

        if (!groupCounts[key]) {
          groupCounts[key] = {
            count: 1,
            centerCode: centerCode,
            groupIdx: groupIdx,
            createdBy: item.createdBy,
            creationDate: item.creationDate,
            fusionCenterCode: item.fusionCenterCode,
            key: key,
            lastModifiedDateMilliSecond: item.lastModifiedDateMilliSecond,
          };
        } else {
          groupCounts[key] = {
            count: groupCounts[key].count + 1,
            centerCode: centerCode,
            groupIdx: groupIdx,
            createdBy: item.createdBy,
            creationDate: item.creationDate,
            fusionCenterCode: item.fusionCenterCode,
            key: key,
            lastModifiedDateMilliSecond: item.lastModifiedDateMilliSecond,
          };
        }
      });

      // Create a new array based on centerCode, groupIdx, and record count
      const newData = Object.keys(groupCounts).map((key) => {
        return groupCounts[key];
      });

      return { newData, data };
    } catch (error) {
      const er = error as any;
      const errorMessage = handleApiError(error);
      notification.error({
        message: errorMessage ?? er.message ?? "Data Fetching Error",
      });
      return er?.response
        ? thunkAPI.rejectWithValue(er?.response.data)
        : thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const SlikRequestsSlice = createSlice({
  name: "SlickRequestsDetails",
  initialState: initialState,
  reducers: {
    SRchangeStatus: (
      state,
      action: PayloadAction<"pending" | "inprogress" | "completed">
    ) => {
      state = {
        ...state,
        selectedStatus: action.payload,
      };
      return state;
    },
    SRchangeType: (state, action: PayloadAction<"group" | "individual">) => {
      state = {
        ...state,
        selectedType: action.payload,
      };
      return state;
    },
    editIndividualData: (state, action: any) => {
      state = {
        ...state,
        slikRequestsIndividualData: {
          data: action.payload,
          fetching: false,
          error: false,
        },
        slikRequestsPaginatedData: {
          data: {
            content: action.payload,
          },
          fetching: false,
          error: false,
        },
      };
      return state;
    },
    resetSlikRequestsStore: () => initialState,
    SRSetBranch: (state, action: PayloadAction<string>) => {
      state = {
        ...state,
        selectedBranch: action.payload,
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSlikRequests.pending, (state, _action) => {
      state.slikRequestsData.fetching = true;
    }),
      builder.addCase(getSlikRequests.fulfilled, (state, action) => {
        state.slikRequestsData.fetching = false;
        state.slikRequestsData.data = action.payload;
      }),
      builder.addCase(getSlikRequests.rejected, (state, _action) => {
        state.slikRequestsData.fetching = false;
      }),
      builder.addCase(getSlikRequestData.pending, (state, action) => {
        state.slikUpdateUserData.selectedUser = action.meta.arg;
        state.slikUpdateUserData.fetching = true;
      }),
      builder.addCase(getSlikRequestData.fulfilled, (state, action) => {
        state.slikUpdateUserData.fetching = false;
        state.slikUpdateUserData.initialData = action.payload;
      }),
      builder.addCase(getSlikRequestData.rejected, (state, _action) => {
        state.slikUpdateUserData.fetching = false;
      }),
      builder.addCase(getSliksWithPagination.pending, (state, _action) => {
        state.slikRequestsPaginatedData.fetching = true;
        state.slikRequestsPaginatedData.data = null;
      }),
      builder.addCase(getSliksWithPagination.fulfilled, (state, action) => {
        state.slikRequestsPaginatedData.fetching = false;
        state.slikRequestsPaginatedData.data = action.payload;
      }),
      builder.addCase(getSliksWithPagination.rejected, (state, _action) => {
        state.slikRequestsPaginatedData.fetching = false;
      });
    // getSlikGroupWithPagination
    builder.addCase(getSlikGroupWithPagination.pending, (state, _action) => {
      state.slikRequestsGroupPaginatedData.fetching = true;
      state.slikRequestsGroupPaginatedData.data = null;
    }),
      builder.addCase(getSlikGroupWithPagination.fulfilled, (state, action) => {
        state.slikRequestsGroupPaginatedData.fetching = false;
        state.slikRequestsGroupPaginatedData.data = action.payload;
      }),
      builder.addCase(getSlikGroupWithPagination.rejected, (state, _action) => {
        state.slikRequestsGroupPaginatedData.fetching = false;
      });
    // end getSlikGroupWithPagination
    // getInnerSlikGroupWithPagination
    builder.addCase(
      getInnerSliksGroupWithPagination.pending,
      (state, _action) => {
        state.innerSlikRequestsGroupPaginatedData.fetching = true;
        state.innerSlikRequestsGroupPaginatedData.data = null;
      }
    ),
      builder.addCase(
        getInnerSliksGroupWithPagination.fulfilled,
        (state, action) => {
          state.innerSlikRequestsGroupPaginatedData.fetching = false;
          state.innerSlikRequestsGroupPaginatedData.data = action.payload;
        }
      ),
      builder.addCase(
        getInnerSliksGroupWithPagination.rejected,
        (state, _action) => {
          state.innerSlikRequestsGroupPaginatedData.fetching = false;
        }
      );
    // end getInnerSlikGroupWithPagination
    builder.addCase(getSlikByGroup.pending, (state, _action) => {
      state.slikRequestsGroupData.fetching = true;
      state.slikRequestsGroupData.initialData = [];
    }),
      builder.addCase(getSlikByGroup.fulfilled, (state, action) => {
        state.slikRequestsGroupData.fetching = false;
        state.slikRequestsGroupData.data = action.payload.newData;
        state.slikRequestsGroupData.initialData = action.payload.data;
      }),
      builder.addCase(getSlikByGroup.rejected, (state, _action) => {
        state.slikRequestsGroupData.fetching = false;
      }),
      builder.addCase(getSlikByIndividual.pending, (state, _action) => {
        state.slikRequestsIndividualData.data = [];
        state.slikRequestsIndividualData.fetching = true;
      }),
      builder.addCase(getSlikByIndividual.fulfilled, (state, action) => {
        state.slikRequestsIndividualData.fetching = false;
        state.slikRequestsIndividualData.data = action.payload;
      });
    builder.addCase(getSlikByIndividual.rejected, (state, _action) => {
      state.slikRequestsIndividualData.fetching = false;
    });
    builder.addCase(getExcelSlikRequestData.pending, (state, _action) => {
      state.slikExcelData.data = [];
      state.slikExcelData.fetching = true;
    }),
      builder.addCase(getExcelSlikRequestData.fulfilled, (state, action) => {
        state.slikExcelData.fetching = false;
        state.slikExcelData.data = action.payload;
      });
    builder.addCase(getExcelSlikRequestData.rejected, (state, _action) => {
      state.slikExcelData.fetching = false;
    });
  },
});

export const slikAsyncActions = SlikRequestsSlice.actions;

export const slikActions = {
  ...slikAsyncActions,
  getSlikRequestData,
  getSlikRequests,
  getSlikByGroup,
  getSlikByIndividual,
  getSliksWithPagination,
  getSlikGroupWithPagination,
  getInnerSliksGroupWithPagination,
  getExcelSlikRequestData,
};

export default SlikRequestsSlice.reducer;
