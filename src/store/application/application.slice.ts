import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDataStoreType } from "./interface";
import { API } from "../../services/Services";
import { AxiosError } from "axios";
import { UploadFile } from "antd";

export const initialState: AppDataStoreType = {
    applications : {
        fetching: false,
        error: false,
        data: null
    },
    customerData:{
        fetching: false,
        error: false,
        data: null
    },
    contactDetails:{
        fetching: false,
        error: false,
        data: null
    },
    addressDetails:{
        fetching: false,
        error: false,
        data: null
    },
    spouseDetails:{
        fetching: false,
        error: false,
        data: null
    },
    businessDetails :{
        fetching: false,
        error: false,
        data: null
    },
    guarantorDetails: {
        fetching: false,
        error: false,
        data: null
    },
    collateralDetails:{
        fetching: false,
        error: false,
        data: null
    },
    cashFlowDetails :{
        fetching: false,
        error: false,
        data: null
    },
    imageDetails:{
        fetching: false,
        error: false,
        data: null
    },
    approvalSteps: {
        fetching: false,
        error: false,
        data: null
    },
    fileList : [],
    financialDetails:{
        fetching: false,
        error: false,
        data: null,
        termRates: [],
        productDetails: []
    },
    financialDetailsSavePending : false
}; 
export const getAllApplications = createAsyncThunk(
    'ApplicationDetails/fetchAllApplications',
    async (data: Parameters<typeof API.appraisalsServices.getAllAppraisals>[0], thunkAPI) => {
        try{
            const response = await API.appraisalsServices.getAllAppraisals(data)
            return response?.data
        }
        catch(error){
            const er = error as AxiosError
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response?.data)
            : thunkAPI.rejectWithValue(er?.message)
        }
    }
  )

  export const getSecondMeetingAppraisals = createAsyncThunk(
    'ApplicationDetails/fetchSecondMeetingApplications',
    async (data: Parameters<typeof API.appraisalsServices.getSecondMeetingAppraisals>[0], thunkAPI) => {
        try{
            const response = await API.appraisalsServices.getSecondMeetingAppraisals(data)
            return response?.data
        }
        catch(error){
            const er = error as AxiosError
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response?.data)
            : thunkAPI.rejectWithValue(er?.message)
        }
    }
  )

  export const getCustomerData = createAsyncThunk(
    'ApplicationDetails/fetchCustomerData',
    async (arg: Parameters<typeof API.personServices.getPersonByIdAppraisalId>[0], thunkAPI) => {
        try{
            const response = await API.personServices.getPersonByIdAppraisalId(arg)
            const maritalStatus = response.data?.[0].maritalStatus
            let maritalData:any
            if(maritalStatus){
                maritalData = await API.productServices.getMaritalStatusByCode(maritalStatus)
            }
            return {
                ...response.data?.[0],
                ...maritalData.data
            }
        }
        catch(error){
            const er = error as AxiosError
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  )

  export const getCustomerContactData = createAsyncThunk(
    'ApplicationDetails/fetchCustomerContactData',
    async (arg: Parameters<typeof API.stakeholderContact.getPersonContactByIdAppraisalId>[0], thunkAPI) => {
        try{
            const response = await  API.stakeholderContact.getPersonContactByIdAppraisalId(arg)
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

  export const getCustomerAddressData = createAsyncThunk(
    'ApplicationDetails/fetchCustomerAddressData',
    async (arg: Parameters<typeof API.stakeholderAddress.getPersonAddressByIdAppraisalId>[0], thunkAPI) => {
        try{
            const response = await API.stakeholderAddress.getPersonAddressByIdAppraisalId(arg)
            const areasResponse  = await API.productServices.getAllAreas()
            const areas = areasResponse.data
            return response.data?.map((address:any) => {
                const setArea = areas?.find((area:any) => address?.postalCode == area?.code)?.description
                return {
                    ...address,
                    area : setArea
                }
            })
        }
        catch(error){
            const er = error as AxiosError
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  )

  export const getBusinessData = createAsyncThunk(
    'ApplicationDetails/fetchCustomerBusinessData',
    async (arg: Parameters<typeof API.stakeholderBussiness.getPersonBusinessByIdAppraisalId>[0], thunkAPI) => {
        try{

            const response = await API.stakeholderBussiness.getPersonBusinessByIdAppraisalId(arg)

            let sectorData:any
            let subSectorData: any
            let areaData: any

            const sector = response.data?.sector
            const subSector = response.data?.subSector
            const area = response.data?.busArea
            
            if(sector){
                sectorData = await API.sectorServices.getSectorByCode(sector)
            }
            // if(subSector){
            //     subSectorData = await API.sectorServices.getSectorByCode(sector)
            // }
            if(area){
                areaData = await API.productServices.getBusinessAreaByCode(area)
            }

            return {
                ...response.data,
                sectorDes : sectorData.data.description,
                bussAreaDes: areaData.data.description,
            }
        }
        catch(error){
            const er = error as AxiosError
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  )

  export const getSpouseData = createAsyncThunk(
    'ApplicationDetails/fetchCustomerSpouseData',
    async (arg: Parameters<typeof API.stakeholderSpouse.getPersonSpouseByIdAppraisalId>[0], thunkAPI) => {
        try{
            const response = await API.stakeholderSpouse.getPersonSpouseByIdAppraisalId(arg)

            let relationshipData:any

            const relation = response.data?.relationship
            
            if(relation){
                relationshipData = await API.productServices.getRelationByCode(relation)
            }
            // if(subSector){
            //     subSectorData = await API.sectorServices.getSectorByCode(sector)
            // }

            return {
                ...response.data,
                relationDesc :  relationshipData.data.relationDesc
            }
        }
        catch(error){
            const er = error as AxiosError
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  )

  export const getGuarantorDetails = createAsyncThunk(
    'ApplicationDetails/fetchCustomerGuranterData',
    async (arg: Parameters<typeof API.stakeholderClientEles.getPersonclientelesByAppraisalId>[0], thunkAPI) => {
        try{
            let centerData:any
            
            const response = await API.stakeholderClientEles.getPersonclientelesByAppraisalId(arg)

            const customerCenterCode = response.data?.find((type: any) => type.cltType === "C").fusionCenterCode
            
            if(customerCenterCode){
                centerData = await API.stakeholderClientEles.getCentersByCode(customerCenterCode)
            }

            return response.data.map((data:any) => (data.cltType === "C")? 
                {...data, centerName: centerData?.data?.centerName} 
                : data
            )
        }
        catch(error){
            const er = error as AxiosError
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  ) 

  export const getCollateralDetails = createAsyncThunk(
    'ApplicationDetails/fetchCustomerCollateralData',
    async (arg: Parameters<typeof API.collateralServices.getAllCollateralsByAppraisals>[0], thunkAPI) => {
        try{
            const response = await API.collateralServices.getAllCollateralsByAppraisals(arg)
            if(response.data.landAndBuildingDtoList?.length){
                const landAndBuilding = response.data.landAndBuildingDtoList

                for(let row of landAndBuilding){
                    let securityCategory
                    let legalBindingType
                    let ownership
                    let certificateType
                    let morgType

                    if(row.securityCategory){
                        securityCategory = await API.commnServices.getSecurityCat(row.securityCategory)
                    }

                    if(row.legalBindingType){
                        legalBindingType = await API.commnServices.getSecurityOwnType(row.legalBindingType)
                    }

                    if(row.ownership){
                        ownership = await API.commnServices.getOwnership(row.ownership)
                    }

                    if(row.certificateType){
                        certificateType = await API.commnServices.getCertificateType(row.certificateType)
                    }
                    if(row.morgType){
                        morgType = await API.commnServices.getMorgeType(row.morgType)
                    }

                    row.securityCategory =  securityCategory?.data.description?? '-'
                    row.legalBindingType =  legalBindingType?.data.description?? '-'
                    row.ownership =  ownership?.data.description?? '-'
                    row.morgType =   morgType?.data.description?? '-'
                    row.titleInsurance = row.titleInsurance == "Y"? "Yes" : row.titleInsurance == "N"? "No" : '-'
                    row.insuranceOfBuilding = row.insuranceOfBuilding == "1"? "Yes" : row.insuranceOfBuilding == "0"? "No" : '-'
                    row.powerOfAttorney = row.powerOfAttorney == "1"? "Yes" : row.powerOfAttorney == "0"? "No" : '-'
                    row.certificateType =   certificateType?.data.description?? '-'
                }
                
            }
            if(response.data.landDtoList?.length){
                const landAndBuilding = response.data.landDtoList

                for(let row of landAndBuilding){
                    let securityCategory
                    let legalBindingType
                    let ownership
                    let certificateType
                    let morgType

                    if(row.securityCategory){
                        securityCategory = await API.commnServices.getSecurityCat(row.securityCategory)
                    }

                    if(row.legalBindingType){
                        legalBindingType = await API.commnServices.getSecurityOwnType(row.legalBindingType)
                    }

                    if(row.ownership){
                        ownership = await API.commnServices.getOwnership(row.ownership)
                    }

                    if(row.certificateType){
                        certificateType = await API.commnServices.getCertificateType(row.certificateType)
                    }
                    if(row.morgType){
                        morgType = await API.commnServices.getMorgeType(row.morgType)
                    }

                    row.securityCategory =  securityCategory?.data.description?? '-'
                    row.legalBindingType =  legalBindingType?.data.description?? '-'
                    row.ownership =  ownership?.data.description?? '-'
                    row.morgType =   morgType?.data.description?? '-'
                    row.titleInsurance = row.titleInsurance == "Y"? "Yes" : row.titleInsurance == "N"? "No" : '-'
                    row.insuranceOfBuilding = row.insuranceOfBuilding == "1"? "Yes" : row.insuranceOfBuilding == "0"? "No" : '-'
                    row.powerOfAttorney = row.powerOfAttorney == "1"? "Yes" : row.powerOfAttorney == "0"? "No" : '-'
                    row.certificateType =   certificateType?.data.description?? '-'
                }
                
            }
            if(response.data.buildingDtoList?.length){
                const landAndBuilding = response.data.buildingDtoList

                for(let row of landAndBuilding){
                    let securityCategory
                    let legalBindingType
                    let ownership
                    let certificateType
                    let morgType

                    if(row.securityCategory){
                        securityCategory = await API.commnServices.getSecurityCat(row.securityCategory)
                    }

                    if(row.legalBindingType){
                        legalBindingType = await API.commnServices.getSecurityOwnType(row.legalBindingType)
                    }

                    if(row.ownership){
                        ownership = await API.commnServices.getOwnership(row.ownership)
                    }

                    if(row.certificateType){
                        certificateType = await API.commnServices.getCertificateType(row.certificateType)
                    }
                    if(row.morgType){
                        morgType = await API.commnServices.getMorgeType(row.morgType)
                    }

                    row.securityCategory =  securityCategory?.data.description?? '-'
                    row.legalBindingType =  legalBindingType?.data.description?? '-'
                    row.ownership =  ownership?.data.description?? '-'
                    row.morgType =   morgType?.data.description?? '-'
                    row.titleInsurance = row.titleInsurance == "Y"? "Yes" : row.titleInsurance == "N"? "No" : '-'
                    row.insuranceOfBuilding = row.insuranceOfBuilding == "1"? "Yes" : row.insuranceOfBuilding == "0"? "No" : '-'
                    row.powerOfAttorney = row.powerOfAttorney == "1"? "Yes" : row.powerOfAttorney == "0"? "No" : '-'
                    row.certificateType =   certificateType?.data.description?? '-'
                }
                
            }
            if(response.data.vehicleDtoList?.length){
                const vehice = response.data.vehicleDtoList
                for(let row of vehice){

                    let vehicleType
                    let vehicleModel
                    let morgType
                    let certificateType
                    let legalBindingType

                    if(row.vehicleType){
                        vehicleType = await API.commnServices.getVehicleType(row.vehicleType)
                    }

                    if(row.vehicleModel){
                        vehicleModel = await API.commnServices.getVehicleModel(row.vehicleModel)
                    }

                    if(row.morgType){
                        morgType = await API.commnServices.getMorgeType(row.morgType)
                    }

                    if(row.certificateType){
                        certificateType = await API.commnServices.getCertificateType(row.certificateType)
                    }

                    if(row.legalBindingType){
                        legalBindingType = await API.commnServices.getSecurityOwnType(row.legalBindingType)
                    }

                    row.vehicleType =  vehicleType?.data.description?? '-'
                    row.vehicleModel =   vehicleModel?.data.description?? '-'
                    row.morgType =   morgType?.data.description?? '-'
                    row.certificateType =   certificateType?.data.description?? '-'
                    row.legalBindingType =  legalBindingType?.data.description?? '-'
                    row.titleInsurance = row.titleInsurance == "Y"? "Yes" : row.titleInsurance == "N"? "No" : '-'
                   
                }
            }
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

  export const getCashFlowDetails = createAsyncThunk(
    'ApplicationDetails/fetchCustomerCahsFlowData',
    async (arg: Parameters<typeof API.incomeExpencesServices.getAllCollateralsByAppraisals>[0], thunkAPI) => {
        try{
            const response = await API.incomeExpencesServices.getAllCollateralsByAppraisals(arg)
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

  export const getApprovalStepsDetails = createAsyncThunk(
    'ApplicationDetails/fetchApprovalStepsData',
    async (arg: Parameters<typeof API.approvalServices.getAllCombinedStepsByAppraisalId>[0], thunkAPI) => {
        try{
            const response = await API.approvalServices.getAllCombinedStepsByAppraisalId(arg)
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

  export const getImageDetails = createAsyncThunk(
    'ApplicationDetails/fetchCustomerImageData',
    async (arg: Parameters<typeof API.documentServices.getAllDocumentsByAppraisalId>[0], thunkAPI) => {
        try{
            const response = await API.documentServices.getAllDocumentsByAppraisalId(arg)
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

  export const getFinanceDetails = createAsyncThunk(
    'ApplicationDetails/fetchFinanceData',
    async ({arg, idx}: {
        arg: Parameters<typeof API.financialServices.getTcByAppraisals>[0],
        idx: any
    }, thunkAPI) => {
        try{
            const response:any = await API.financialServices.getTcByAppraisals(arg)

            const productCode = response.data.pTrhdLType
            let product
            let termRates
            if(productCode){
                product = await API.productServices.getProductByCode(productCode)
                termRates = await API.productServices.getTearmRatesByCode(productCode)
            }
            let tc: any
            if(response?.data?.tcNo){
                tc = await API.financialServices.saveTCToFusion(
                    {
                      tcNo: response.data.tcNo,
                      mode: "P"
                    }
                    )
            }
            let userData: any
            if(idx){
                userData = await API.userServices.getUserById(idx)
            }
            return {
                data : {
                    ...response.data,
                    productName: product?.data?.productName,
                    ...tc.data?.object,
                    ...userData?.data
                },
                termRates: termRates?.data?.terms,
                productDetails: product?.data
            }
        }
        catch(error){
            const er = error as AxiosError
            return er?.response 
            ? thunkAPI.rejectWithValue(er?.response.data)
            : thunkAPI.rejectWithValue(er.message)
        }
    }
  ) 

export const ApplicationDataSlice = createSlice({
    name: "ApplicationDetails",
    initialState: initialState,
    reducers: {
        updateApplicationFileUpload: (state, action: PayloadAction<UploadFile[]>) => {
            state = { 
                ...state, 
                fileList : action.payload
            };
            return state;
        },
        updateLoan: (state, action: PayloadAction<any>) => {
            state = { 
                ...state, 
                financialDetails : {
                    ...state.financialDetails,
                    data: {
                        ...state.financialDetails.data,
                        pTrhdLocCost: action.payload
                    }
                }
            };
            return state;
        },
        updateTerm: (state, action: PayloadAction<any>) => {
            state = { 
                ...state, 
                financialDetails : {
                    ...state.financialDetails,
                    data: {
                        ...state.financialDetails.data,
                        pTrhdTerm: action.payload
                    }
                }
            };
            return state;
        },
        financialDSavePendingUpdate: (state, action: PayloadAction<boolean>) => {
            state = { 
                ...state, 
                financialDetailsSavePending : action.payload
            };
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllApplications.pending , (state, action) => {
            state.applications.fetching = true
            state.applications.data = []
        }),
        builder.addCase(getAllApplications.fulfilled , (state, action) => {
            state.applications.fetching = false
            state.applications.data = action.payload
        })
        builder.addCase(getAllApplications.rejected , (state, action) => {
            state.applications.fetching = false
            state.applications.data = []
        })

        builder.addCase(getSecondMeetingAppraisals.pending , (state, action) => {
            state.applications.fetching = true
            state.applications.data = []
        }),
        builder.addCase(getSecondMeetingAppraisals.fulfilled , (state, action) => {
            state.applications.fetching = false
            state.applications.data = action.payload
        })
        builder.addCase(getSecondMeetingAppraisals.rejected , (state, action) => {
            state.applications.fetching = false
            state.applications.data = []
        })

        builder.addCase(getCustomerData.pending , (state, action) => {
            state.customerData.fetching = true
        }),
        builder.addCase(getCustomerData.fulfilled , (state, action) => {
            state.customerData.fetching = false
            state.customerData.data = action.payload
        }) 

        builder.addCase(getCustomerContactData.pending , (state, action) => {
            state.contactDetails.fetching = true
        }),
        builder.addCase(getCustomerContactData.fulfilled , (state, action) => {
            state.contactDetails.fetching = false
            state.contactDetails.data = action.payload
        })

        builder.addCase(getCustomerAddressData.pending , (state, action) => {
            state.addressDetails.fetching = true
        }),
        builder.addCase(getCustomerAddressData.fulfilled , (state, action) => {
            state.addressDetails.fetching = false
            state.addressDetails.data = action.payload
        })

        builder.addCase(getBusinessData.pending , (state, action) => {
            state.businessDetails.fetching = true
        }),
        builder.addCase(getBusinessData.fulfilled , (state, action) => {
            state.businessDetails.fetching = false
            state.businessDetails.data = action.payload
        })
        builder.addCase(getSpouseData.pending , (state, action) => {
            state.spouseDetails.fetching = true
        }),
        builder.addCase(getSpouseData.fulfilled , (state, action) => {
            state.spouseDetails.fetching = false
            state.spouseDetails.data = action.payload
        })
        builder.addCase(getGuarantorDetails.pending , (state, action) => {
            state.guarantorDetails.fetching = true
        }),
        builder.addCase(getGuarantorDetails.fulfilled , (state, action) => {
            state.guarantorDetails.fetching = false
            state.guarantorDetails.data = action.payload
        })
        builder.addCase(getCollateralDetails.pending , (state, action) => {
            state.guarantorDetails.fetching = true
        }),
        builder.addCase(getCollateralDetails.fulfilled , (state, action) => {
            state.collateralDetails.fetching = false
            state.collateralDetails.data = action.payload
        })
        builder.addCase(getCashFlowDetails.pending , (state, action) => {
            state.cashFlowDetails.fetching = true
        }),
        builder.addCase(getCashFlowDetails.fulfilled , (state, action) => {
            state.cashFlowDetails.fetching = false
            state.cashFlowDetails.data = action.payload
        })
        builder.addCase(getImageDetails.pending , (state, action) => {
            state.imageDetails.fetching = true
        }),
        builder.addCase(getImageDetails.fulfilled , (state, action) => {
            state.imageDetails.fetching = false
            state.imageDetails.data = action.payload
        })
        builder.addCase(getApprovalStepsDetails.pending , (state, action) => {
            state.approvalSteps.fetching = true
        }),
        builder.addCase(getApprovalStepsDetails.fulfilled , (state, action) => {
            state.approvalSteps.fetching = false
            state.approvalSteps.data = action.payload
        })
        builder.addCase(getFinanceDetails.pending , (state, action) => {
            state.financialDetails.fetching = true
        }),
        builder.addCase(getFinanceDetails.fulfilled , (state, action) => {
            state.financialDetails.fetching = false
            state.financialDetails.data = action.payload.data
            state.financialDetails.termRates = action.payload.termRates,
            state.financialDetails.productDetails = action.payload.productDetails
        })
    }
});

export const appDataAsyncActions = ApplicationDataSlice.actions

export const ApplicationActions = {
    ...appDataAsyncActions,
    getAllApplications,
    getCustomerData,
    getCustomerContactData,
    getCustomerAddressData,
    getBusinessData,
    getSpouseData,
    getGuarantorDetails,
    getCollateralDetails,
    getCashFlowDetails,
    getImageDetails,
    getApprovalStepsDetails,
    getFinanceDetails,
    getSecondMeetingAppraisals
}

export default ApplicationDataSlice.reducer;