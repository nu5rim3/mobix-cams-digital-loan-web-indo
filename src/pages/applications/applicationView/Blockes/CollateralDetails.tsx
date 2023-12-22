import * as React from 'react';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';
import { Descriptions, DescriptionsProps, Divider, Grid, Spin } from 'antd';
import getCurrency from '../../../../utils/getCurrency';

export interface ICollateralDetailsProps {
}

const itemsGold: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'goldIdx',
        label: 'Gold ID',
        children: (data.goldIdx),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'goldValue',
        label: 'Gold Value',
        children: getCurrency(data.goldValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'goldCarat',
        label: 'Gold Carat',
        children: data.goldCarat,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'goldGram',
        label: 'Gold Gram',
        children: data.goldGram,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'nameInCertificate',
        label: 'Name In Certificate',
        children: data.nameInCertificate,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ex1',
        label: '',
        children:''
    },
]

const itemsLand: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'landIdx',
        label: 'Land ID',
        children: (data.landIdx),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'landValue',
        label: 'Land Value',
        children: getCurrency(data.landValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'certificateNo',
        label: 'Certificate No',
        children: data.certificateNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'location',
        label: 'Location',
        children: data.location,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ownerName',
        label: 'Owner Name',
        children: data.ownerName,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'securityType',
        label: 'Security Type',
        children: data.securityType,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'securityCategory',
        label: 'Security Category',
        children: data.securityCategory === "M"
            ? 'Main Security' 
            : data.securityCategory === "O"
            ? 'Other Security'
            : '-',
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'legalBindingDate',
        label: 'Legal Binding Date',
        children: data.legalBindingDate,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'legalBindingType',
        label: 'Legal Binding Type',
        children: data.legalBindingType,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ownership',
        label: 'Ownership',
        children: data.ownership == "0"
            ? 'Own' 
            : data.ownership == "2"
            ? 'Third party'
            : '-',
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'collateralOwnerName',
        label: 'Collateral Owner Name',
        children: data.collateralOwnerName,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'recordOrderNo',
        label: 'Record Order No',
        children: data.recordOrderNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'certificateType',
        label: 'Certificate Type',
        children: data.certificateType,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'titleInsurance',
        label: 'Title Insurance',
        children: data.titleInsurance,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'marketValue',
        label: 'Market Value',
        children: getCurrency(data.marketValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'forcedSaleValue',
        label: 'Forced Sale Value',
        children: data.forcedSaleValue,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bondNo',
        label: 'Bond No',
        children: data.bondNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bondDate',
        label: 'Bond Date',
        children: data.bondDate,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'extentOfProperty',
        label: 'Extent Of Property',
        children: data.extentOfProperty,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bondValue',
        label: 'Bond Value',
        children: getCurrency(data.bondValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'lawyerName',
        label: 'Lawyer Name',
        children: data.lawyerName,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'insuranceOfBuilding',
        label: 'Insurance Of Building',
        children: data.insuranceOfBuilding,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'description',
        label: 'Description',
        children: data.description,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'powerOfAttorney',
        label: 'Power Of Attorney',
        children: data.powerOfAttorney,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'deedTitleNo',
        label: 'Deed Title No',
        children: data.deedTitleNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'morgType',
        label: 'Morg Type',
        children: data.morgType,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'createdBy',
        label: 'Created By',
        children: data.createdBy,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ex1',
        label: '',
        children:''
    },
]

const itemsVehicle: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'vehIdx',
        label: 'Vehicle ID',
        children: (data.vehIdx),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'vehicleType',
        label: 'Vehicle Type',
        children: data.vehicleType,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'vehicleModel',
        label: 'Vehicle Model',
        children: data.vehicleModel,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'vehicleNo',
        label: 'Vehicle No',
        children: data.vehicleNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ownerName',
        label: 'Owner Name',
        children: data.ownerName,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'vehicleYear',
        label: 'Vehicle Year',
        children: data.vehicleYear,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'vehicleModelDesc',
        label: 'Vehicle Model Desc',
        children: data.vehicleModelDesc,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'vehicleMakeDesc',
        label: 'Vehicle Make Desc',
        children: data.vehicleMakeDesc,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'securityCategory',
        label: 'Security Category',
        children: data.securityCategory == "M" 
        ? 'Main Security'
        : data.securityCategory == "O" 
        ? 'Other Security'
        : '-',
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'legalBindingType',
        label: 'Legal Binding Type',
        children: data.legalBindingType,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'legalBindingDate',
        label: 'Legal Binding Date',
        children: data.legalBindingDate,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ownership',
        label: 'Ownership',
        children: data.ownership == "0" 
        ? 'Own'
        : data.ownership == "2" 
        ? 'Third party'
        : '-',
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'collateralOwnerName',
        label: 'Collateral Owner Name',
        children: data.collateralOwnerName,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'recordOrderNo',
        label: 'Record Order No',
        children: data.recordOrderNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'certificateType',
        label: 'Certificate Type',
        children: data.certificateType,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'locationDescription',
        label: 'Location Description',
        children: data.locationDescription,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'titleInsurance',
        label: 'Title Insurance',
        children: data.titleInsurance,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'marketValue',
        label: 'Market Value',
        children: getCurrency(data.marketValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'forcedSaleValue',
        label: 'Forced Sale Value',
        children: getCurrency(data.forcedSaleValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'condition',
        label: 'Condition',
        children: data.condition == "1" 
        ? 'New/Recondition'
        : data.condition == "2" 
        ? '2nd Hand'
        : '-',
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'engineNo',
        label: 'Engine No',
        children: data.engineNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'chassisNo',
        label: 'Chassis No',
        children: data.chassisNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'registrationNo',
        label: 'Registration No',
        children: data.registrationNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'yearOfManufacture',
        label: 'Year Of Manufacture',
        children: data.yearOfManufacture,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'dateOfFirstReg',
        label: 'Date Of First Reg',
        children: data.dateOfFirstReg,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'regBookNo',
        label: 'Reg Book No',
        children: data.regBookNo,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bookReceivedDate',
        label: 'Book Received Date',
        children: data.bookReceivedDate,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'crReleaseDate',
        label: 'CR Release Date',
        children: data.crReleaseDate,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'morgType',
        label: 'Morg Type',
        children: data.morgType,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
   
    {
        key: 'ex1',
        label: '',
        children:''
    },
]

const itemsOther: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'otherType',
        label: 'Other Type',
        children: (data.otherType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'otherIdx',
        label: 'Other ID',
        children: getCurrency(data.otherIdx),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'otherValue',
        label: 'Value',
        children: getCurrency(data.otherValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
   
]

const landAndBuildingDtoList: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'landBuildIdx',
        label: 'Land Build ID',
        children: (data.landBuildIdx),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'location',
        label: 'Location',
        children: (data.location),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'certificateNo',
        label: 'Certificate No',
        children: (data.certificateNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ownerName',
        label: 'Owner Name',
        children: (data.ownerName),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'securityCategory',
        label: 'Security Category',
        children: (data.securityCategory),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'legalBindingType',
        label: 'Legal Binding Type',
        children: (data.legalBindingType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'legalBindingDate',
        label: 'Legal Binding Date',
        children: (data.legalBindingDate),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ownership',
        label: 'Ownership',
        children: (data.ownership),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'collateralOwnerName',
        label: 'Collateral Owner Name',
        children: (data.collateralOwnerName),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'recordOrderNo',
        label: 'Record Order No',
        children: (data.recordOrderNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'appraisalDate',
        label: 'Appraisal Date',
        children: (data.appraisalDate),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'titleInsurance',
        label: 'Title Insurance',
        children: (data.titleInsurance),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'marketValue',
        label: 'Market Value',
        children: getCurrency(data.marketValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'forcedSaleValue',
        label: 'Forced Sale Value',
        children: getCurrency(data.forcedSaleValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bondNo',
        label: 'Bond No',
        children: (data.bondNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bondDate',
        label: 'Bond Date',
        children: (data.bondDate),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'extentOfProperty',
        label: 'Extent Of Property',
        children: (data.extentOfProperty),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bondValue',
        label: 'Bond Value',
        children: getCurrency(data.bondValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'lawyerName',
        label: 'Lawyer Name',
        children: (data.lawyerName),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'insuranceOfBuilding',
        label: 'Insurance Of Building',
        children: (data.insuranceOfBuilding),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'description',
        label: 'Description',
        children: (data.description),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'powerOfAttorney',
        label: 'Power Of Attorney',
        children: (data.powerOfAttorney),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'deedTitleNo',
        label: 'Deed Title No',
        children: (data.deedTitleNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'morgType',
        label: 'Morg Type',
        children: (data.morgType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ex1',
        label: '',
        children:''
    },
    {
        key: 'ex2',
        label: '',
        children:''
    },
]

const condominiumDtoList: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'condominiumIdx',
        label: 'Condominium Id',
        children: (data.condominiumIdx),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'location',
        label: 'Location',
        children: (data.location),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'certificateNo',
        label: 'Certificate No',
        children: (data.certificateNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'ownerName',
        label: 'Owner Name',
        children: (data.ownerName),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'condominiumValue',
        label: 'Condominium Value',
        children: getCurrency(data.condominiumValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'securityCategory',
        label: 'securityCategory',
        children: (data.securityCategory),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'securityType',
        label: 'Security Type',
        children: (data.securityType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'legalBindingType',
        label: 'Legal Binding Type',
        children: (data.legalBindingType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'legalBindingDate',
        label: 'Legal Binding Date',
        children: (data.legalBindingDate),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'ownership',
        label: 'Ownership',
        children: (data.ownership),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'collateralOwnerName',
        label: 'Collateral Owner Name',
        children: (data.collateralOwnerName),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'recordOrderNo',
        label: 'Record Order No',
        children: (data.recordOrderNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'certificateType',
        label: 'Certificate Type',
        children: (data.certificateType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'titleInsurance',
        label: 'Title Insurance',
        children: (data.titleInsurance),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'marketValue',
        label: 'Market Value',
        children: getCurrency(data.marketValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'forcedSaleValue',
        label: 'Forced Sale Value',
        children: getCurrency(data.forcedSaleValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'bondNo',
        label: 'Bond No',
        children: (data.bondNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'extentOfProperty',
        label: 'Extent Of Property',
        children: (data.extentOfProperty),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'bondValue',
        label: 'Bond Value',
        children: (data.bondValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'lawyerName',
        label: 'Lawyer Name',
        children: (data.lawyerName),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'insuranceOfBuilding',
        label: 'Insurance Of Building',
        children: (data.insuranceOfBuilding),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'description',
        label: 'Description',
        children: (data.description),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'powerOfAttorney',
        label: 'Power Of Attorney',
        children: (data.powerOfAttorney),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'deedTitleNo',
        label: 'Deed Title No',
        children: (data.deedTitleNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'morgType',
        label: 'Morg Type',
        children: (data.morgType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
    {
        key: 'createdBy',
        label: 'Created By',
        children: (data.createdBy),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '20%'
        }
    },
]

const buildingDtoList: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'buildingIdx',
        label: 'Building Id',
        children: (data.buildingIdx),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'securityType',
        label: 'Security Type',
        children: (data.securityType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'securityCategory',
        label: 'Security Category',
        children: (data.securityCategory),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'legalBindingType',
        label: 'Legal Binding Type',
        children: (data.legalBindingType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'legalBindingDate',
        label: 'Legal Binding Date',
        children: (data.legalBindingDate),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ownership',
        label: 'Ownership',
        children: (data.ownership),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ownerName',
        label: 'Owner Name',
        children: (data.ownerName),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'recordOrderNo',
        label: 'Record Order No',
        children: (data.recordOrderNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'certificateType',
        label: 'Certificate Type',
        children: (data.certificateType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'certificateNo',
        label: 'Certificate No',
        children: (data.certificateNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'appraisalDate',
        label: 'Appraisal Date',
        children: (data.appraisalDate),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'location',
        label: 'Location',
        children: (data.location),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'titleInsurance',
        label: 'Title Insurance',
        children: (data.titleInsurance),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'marketValue',
        label: 'Market Value',
        children: getCurrency(data.marketValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'forcedSaleValue',
        label: 'Forced Sale Value',
        children: (data.forcedSaleValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bondNo',
        label: 'Bond No',
        children: (data.bondNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bondDate',
        label: 'Bond Date',
        children: (data.bondDate),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'extentOfProperty',
        label: 'Extent Of Property',
        children: (data.extentOfProperty),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'bondValue',
        label: 'Bond Value',
        children: getCurrency(data.bondValue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'lawyerName',
        label: 'Lawyer Name',
        children: (data.lawyerName),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'insuranceOfBuilding',
        label: 'Insurance Of Building',
        children: (data.insuranceOfBuilding),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'description',
        label: 'Description',
        children: (data.description),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'powerOfAttorney',
        label: 'Power Of Attorney',
        children: (data.powerOfAttorney),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'deedTitleNo',
        label: 'Deed Title No',
        children: (data.deedTitleNo),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'morgType',
        label: 'Morg Type',
        children: (data.morgType),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'createdBy',
        label: 'Created By',
        children: (data.createdBy),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
]

export default function CollateralDetails (props: ICollateralDetailsProps) {

    const {
        collateralDetails : {
            data, fetching }
    } = useSelector((state: any) => state.Application)

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint()
    
  return (
    <div
        style={{
            fontWeight: 300
        }} 
    >
        {fetching?
            <div className='w-full h-32 flex justify-center'>
                <Spin/>
            </div>
        :
            <div>
                {data?.goldDtoList?.length?
                    <>
                    <Title 
                        level={5}
                        title='Collateral Type: Gold'
                        style={{color: '#7C3626'}} 
                    />

                    {
                        data?.goldDtoList?.map((guarantor:any, index: any) => {
                                return  <div 
                                    // className='py-4' 
                                    style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                    className='p-5 rounded-md  font-sans my-4' 
                                    key={index}
                                    >
                                    <Descriptions 
                                    key={index}
                                    column={ screens.xs?
                                     1 : 3
                                    }
                                    items={guarantor? itemsGold(guarantor): []} 
                                    size='small'
                                />  

                                </div>
                    })}

                    <Divider/>
                    </>
                : null}

                {data?.landDtoList?.length?
                    <>
                        <Title 
                            level={5}
                            title='Collateral Type: Land'
                            style={{color: '#7C3626'}} 
                        />

                        {data?.landDtoList?.map((guarantor:any, index: any) => {
                                    return  <div 
                                        style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                        className='p-5 rounded-md  font-sans my-4'
                                        key={index}
                                        >
                                        <Descriptions 
                                            key={index}
                                            column={ screens.xs?
                                                1 : 3
                                               }
                                            items={guarantor? itemsLand(guarantor): []} 
                                            size='small'
                                    />  
                                    </div>
                        })}

                        <Divider/>
                    </>
                :null
                }

                {data?.vehicleDtoList?.length?
                    <>
                    <Title 
                        level={5}
                        title='Collateral Type: Vehical'
                        style={{color: '#7C3626'}} 
                    />


                    {data?.vehicleDtoList?.map((guarantor:any, index: any) => {
                                return  <div 
                                    style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                    className='p-5 rounded-md  font-sans my-4'
                                    key={index}
                                    >
                                    <Descriptions 
                                        key={index}
                                        column={ screens.xs?
                                            1 : 3
                                           }
                                        items={guarantor? itemsVehicle(guarantor): []} 
                                        size='small'
                                />  
                                </div>
                    })}

                    <Divider/>
                    </>
                :null
                }

                {data?.otherDtoList?.length?
                    <>
                    <Title 
                        level={5}
                        title='Collateral Type: Other'
                        style={{color: '#7C3626'}} 
                    />

                    {data?.otherDtoList?.map((guarantor:any, index: any) => {
                                return  <div 
                                    style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                    className='p-5 rounded-md  font-sans my-4'
                                    key={index}
                                    >
                                    <Descriptions 
                                        key={index}
                                        column={ screens.xs?
                                            1 : 3
                                           }
                                        items={guarantor? itemsOther(guarantor): []} 
                                        size='small'
                                />  
                                </div>
                    })}
                    </>
                : null
                }

                {data?.landAndBuildingDtoList?.length?
                    <>
                    <Title 
                        level={5}
                        title='Collateral Type: Land And Building'
                        style={{color: '#7C3626'}} 
                    />

                    {data?.landAndBuildingDtoList?.map((guarantor:any, index: any) => {
                                return  <div 
                                    style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                    className='p-5 rounded-md  font-sans my-4'
                                    key={index}
                                    >
                                    <Descriptions 
                                        key={index}
                                        column={ screens.xs?
                                            1 : 3
                                           }
                                        items={guarantor? landAndBuildingDtoList(guarantor): []} 
                                        size='small'
                                />  
                                </div>
                    })}
                    </>
                : null
                }


                {data?.condominiumDtoList?.length? 
                    <>
                    <Title 
                        level={5}
                        title='Collateral Type: Condominium'
                        style={{color: '#7C3626'}} 
                    />

                    {data?.condominiumDtoList?.map((guarantor:any, index: any) => { //condominiumDtoList
                                return  <div 
                                    style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                    className='p-5 rounded-md  font-sans my-4'
                                    key={index}
                                    >
                                    <Descriptions 
                                        key={index}
                                        column={ screens.xs?
                                            1 : 3
                                           }
                                        items={guarantor? condominiumDtoList(guarantor): []} 
                                        size='small'
                                />  
                                </div>
                    })}
                    </>
                : null
                }

                {data?.buildingDtoList?.length? // buildingDtoList
                    <>
                    <Title 
                        level={5}
                        title='Collateral Type: Building'
                        style={{color: '#7C3626'}} 
                    />

                    {data?.buildingDtoList?.map((guarantor:any, index: any) => { //buildingDtoList
                                return  <div 
                                    style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                    className='p-5 rounded-md  font-sans my-4'
                                    key={index}
                                    >
                                    <Descriptions 
                                        key={index}
                                        column={ screens.xs?
                                            1 : 3
                                           }
                                        items={guarantor? buildingDtoList(guarantor): []} 
                                        size='small'
                                />  
                                </div>
                    })}
                    </>
                : null
                }
            </div>
        }
    </div>
  );
}
