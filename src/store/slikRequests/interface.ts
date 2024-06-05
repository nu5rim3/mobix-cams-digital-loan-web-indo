export enum SlikRequestStatusType {
  PENDING = "pending",
  INPROGRESS = "inprogress",
  COMPLETED = "completed",
}

export interface paginationDataType {
  content: any[] | [];
  page?: number;
  size?: number;
  total?: number;
}

export interface SlikRequestsStoreType {
  selectedStatus: "pending" | "inprogress" | "completed";
  selectedType: "group" | "individual";
  slikRequestsGroupData: {
    initialData: any[];
    data: any[];
    fetching: boolean;
    error: boolean | string;
  };
  slikRequestsIndividualData: {
    data: any[];
    fetching: boolean;
    error: boolean | string;
  };
  slikRequestsPaginatedData: {
    data: paginationDataType | null;
    fetching: boolean;
    error: boolean | string;
  };
  slikRequestsData: {
    data: any[];
    fetching: boolean;
    error: boolean | string;
  };
  slikUpdateUserData: {
    selectedUser: null | string;
    fetching: boolean;
    initialData: null | {};
    updateData: null | {};
  };
  bulkUploadBatch: {
    uploadLoading: boolean;
    uploadSuccess: boolean;
    uploadError: boolean;
  };
  selectedBranch: string;
}
