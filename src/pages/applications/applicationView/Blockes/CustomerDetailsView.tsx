import { Descriptions, DescriptionsProps, Divider, Spin } from 'antd';
import * as React from 'react';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';
import formatAddress from '../../../../utils/getAddressByObjects';

export interface ICustomerDetailsViewProps {
}

export default function CustomerDetailsView (props: ICustomerDetailsViewProps) {

    const items: (data: any) => DescriptionsProps['items'] = (data) => [
        {
          key: 'fullName',
          label: 'Full Name',
          children: data.fullName, //initialData?.centerCode,
          labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
          }
        },
        {
            key: 'ktp',
            label: 'ID Number',
            children: data.ktp, //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'gender',
            label: 'Gender',
            children: data.gender == "M"? "Male" : "Female", //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'nickName',
            label: 'Nick Name',
            children: data.nickName, //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'bioMotherName',
            label: "Mother's Name",
            children: data.bioMotherName, //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'maritalStatus',
            label: 'Marital Status',
            children: data.maritalStatus, //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'birthPlace',
            label: 'Place of Birth',
            children: data.birthPlace?? '-', //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'dateOfBirth',
            label: 'Date of Birth',
            children: data.dateOfBirth, //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'lastEducation',
            label: 'Last Education',
            children: data.lastEducation?? '-', //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'numberOfDependent',
            label: 'Number of Dependents',
            children: data.numberOfDependent?? '-', //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'adult',
            label: 'Adults',
            children: data.adult?? '-', //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'stillStudying',
            label: 'Still Studing',
            children: data.stillStudying?? '-', //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
    ]

    const itemsContact: (data: any) => DescriptionsProps['items'] = (data) => [
        {
            key: 'conType',
            label: 'Contact Type',
            children: data.conType,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'cusConNumber',
            label: 'Contact Number',
            children: data.cusConNumber,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'creationDate',
            label: 'Creation Date',
            children: data.creationDate,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
    ]

    const itemsAddress: (data: any) => DescriptionsProps['items'] = (data) => [
        {
            key: 'addressType',
            label: 'Address Type',
            children: data.addressType,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'address',
            label: 'Address',
            children: formatAddress({
                address1 :data.address1,
                address2: data.address2,
                address3: data.address3,
                address4 :data.address4
            }),
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'postalCode',
            label: 'Postal Code',
            children: data.postalCode?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'lengthOfStay',
            label: 'Length Of Stay',
            children: data.lengthOfStay?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'creationDate',
            label: 'Creation Date',
            children: data.creationDate,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
    ]

    const businessItems: (data: any) => DescriptionsProps['items'] = (data) => [
        {
            key: 'sector',
            label: 'Sector',
            children: data.sector?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'subSector',
            label: 'Sub Sector',
            children: data.subSector?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'businessDetails',
            label: 'Business Details',
            children: data.businessDetails?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'busArea',
            label: 'Business Area',
            children: data.busArea?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'businessLength',
            label: 'Business Length',
            children: data.businessLength?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'totalManPower',
            label: 'Total Man Power',
            children: data.totalManPower?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'address',
            label: 'Business Address',
            children: data. address1? formatAddress({
                address1 :data.address1,
                address2: data.address2,
                address3: data.address3,
                address4 :data.address4
            }): '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
       
    ]

    const spouseItems: (data: any) => DescriptionsProps['items'] = (data) => [
        {
            key: 'Spouse Name',
            label: 'spouseName',
            children: data.spouseName?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'relationship',
            label: 'Relationship',
            children: data.relationship?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'spouseMobNumber',
            label: 'Spouse Mobile No',
            children: data.spouseMobNumber?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'spouseJob',
            label: 'Spouse Job',
            children: data.spouseJob?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'spouseKtp',
            label: 'Spouse ID No',
            children: data.spouseKtp?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'gender',
            label: 'Gender',
            children: data.gender?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        }
    ]
    
    const {
        customerData,
        contactDetails,
        addressDetails,
        businessDetails,
        spouseDetails
    } = useSelector((state: any) => state.Application)
    
  return (
    <div
    style={{
        fontWeight: 300
    }} 
>
    {customerData.fetching?
        <div className='w-full h-32 flex justify-center'><Spin/></div>
    :
        <div>
            <Descriptions 
                title={
                <Title 
                    level={5}
                    title='Personal Details'
                    style={{color: '#7C3626'}} 
                /> 
                }
                column={
                3
                }
                items={customerData.data? items(customerData.data): []} 
                size='small'
            />  

            <Divider/>


            <Title 
                level={5}
                title='Contact Details'
                style={{color: '#7C3626'}} 
            /> 

            <div className='grid grid-cols-3 gap-5 pt-2 '>
                {contactDetails?.data?.map((contact:any, index: any) => {
                    return <div 
                        style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                        className='p-5 rounded-md  font-sans' 
                        key={index}
                        >
                    <Descriptions 
                        key={index}
                        column={
                        1
                        }
                        items={contact? itemsContact(contact): []} 
                        size='small'
                    />
                    </div>

                })}
            </div>

            <Divider/>

            <Title 
                level={5}
                title='Address Details'
                style={{color: '#7C3626'}} 
            /> 

            <div className='grid grid-cols-3 gap-5 pt-2'>
                {addressDetails?.data?.map((address:any, index: any) => {
                    return  <div 
                        style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                        className='p-5 rounded-md  font-sans' 
                        key={index}
                        > 
                    <Descriptions 
                        key={index}
                        column={
                        1
                        }
                        items={address? itemsAddress(address): []} 
                        size='small'
                    />
                    </div>
                })}
            </div>

            <Divider/>

            <Descriptions 
                title={
                <Title 
                    level={5}
                    title='Bussiness Details'
                    style={{color: '#7C3626'}} 
                /> 
                }
                column={
                3
                }
                items={businessDetails.data? businessItems(businessDetails.data): []} 
                size='small'
            />  

            <Divider/>

            <Descriptions 
                title={
                <Title 
                    level={5}
                    title='Spouse Details'
                    style={{color: '#7C3626'}} 
                /> 
                }
                column={
                3
                }
                items={spouseDetails.data? spouseItems(spouseDetails.data): []} 
                size='small'
            />  
        </div>
    }
</div>
  );
}
