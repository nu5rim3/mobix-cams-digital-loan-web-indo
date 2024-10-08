import { Descriptions, Button, Space, DescriptionsProps, Divider, Grid, Spin } from 'antd';
import { useState } from 'react';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';
import formatAddress from '../../../../utils/getAddressByObjects';
import PopupImage from '../../../../components/PopupImage/PopupImage';
export interface ICustomerDetailsViewProps {
}

export interface IImageCategory {
    mainCategory: 'CLIENT_IDENTIFICATION' | 'RESIDENCIAL_IMAGES' | 'BUSINESS_IMAGE' | 'SPOUSE_IMAGES' | 'GUARANTOR' | 'COLLATERAL_IMAGES' | ""
    subCategory: 'CUSTOMER_ID' | 'FAMILY_CARD' | 'CUSTOMER_IMAGE' | 'RESIDENCE_LOCATION_TAGGING' | 'RESIDENCE_IMAGE' | 'RESIDENCE_OWNERSHIP_PROOF' | 'BUSINESS_LOCATION_TAGGING' | 'BUSINESS_IMAGE' | 'SPOUSE_ID' | "SPOUSE_IMAGE" | "GUARANTOR_ID" | "COLLATERAL_IMAGES" | ""
}

export default function CustomerDetailsView(props: ICustomerDetailsViewProps) {

    const [openImage, setOpenImage] = useState(false)
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint()

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
            label: 'NIK',
            children: data?.ktp,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'gender',
            label: 'Gender',
            children: data.gender == "M" ? "Male" : "Female", //initialData?.centerCode,
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
            children: data.maritalDesc, //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'birthPlace',
            label: 'Place of Birth',
            children: data.birthPlace ?? '-', //initialData?.centerCode,
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
            children: data.lastEducation ?? '-', //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'numberOfDependent',
            label: 'Number of Dependents',
            children: data.numberOfDependent ?? '-', //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'adult',
            label: 'Number of Adult Dependents',
            children: data.adult ?? '-', //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'stillStudying',
            label: 'Still Studying',
            children: data.stillStudying ?? '-', //initialData?.centerCode,
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'ktp',
            label: '',
            children:
                <div className='flex justify-between w-full'>

                    <Space size="middle">
                        {/* <Link target="_blank" to={`/indo-digital-loan/auth/applications/internal-crib/${data.cltIdx}`} className="btn btn-info btn-sm"><i className="bx bxs-report font-size-16 align-middle me-2"></i>Internal Crib</Link> */}
                        <Button type="primary" target="_blank" href={`/indo-digital-loan/auth/applications/internal-crib/${data.cltIdx}`}>Internal Crib</Button>
                    </Space>
                </div>,

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

    const itemsAddressType1: (data: any) => DescriptionsProps['items'] = (data) => [
        {
            key: 'addressType',
            label: 'Address Type',
            children: data.addressType == 'TEMPORARY' ? 'RESIDENTIAL' : data.addressType,
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
                address1: data.address1,
                address2: data.address2,
                address3: data.address3,
                address4: data.address4
            }),
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'area',
            label: 'Area',
            children: data.area ?? '-',
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

    const itemsAddressType2: (data: any) => DescriptionsProps['items'] = (data) => [
        {
            key: 'addressType',
            label: 'Address Type',
            children: data.addressType == 'TEMPORARY' ? 'RESIDENTIAL' : data.addressType,
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
                address1: data.address1,
                address2: data.address2,
                address3: data.address3,
                address4: data.address4
            }),
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'area',
            label: 'Area',
            children: data.area ?? '-',
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
        {
            key: 'lengthOfStay',
            label: 'Length Of Stay',
            children: data.lengthOfStay ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'statusOfResidence',
            label: 'Status Of Residence',
            children: data.statusOfResidence ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'proofOfPropertyOwnership',
            label: 'Proof Of Property Ownership',
            children: data.proofOfPropertyOwnership ?? '-',
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
            children: data.sectorDes ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'subSector',
            label: 'Sub Sector',
            children: data.subSector ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'businessDetails',
            label: 'Business Details',
            children: data.businessDetails ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'busArea',
            label: 'Business Area',
            children: data.bussAreaDes ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'businessLength',
            label: 'Business Length',
            children: data.businessLength ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'totalManPower',
            label: 'Total Man Power',
            children: data.totalManPower ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },

    ]

    const spouseItems: (data: any) => DescriptionsProps['items'] = (data) => [
        {
            key: 'spouseName',
            label: 'Spouse Name',
            children: data.spouseName ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'relationship',
            label: 'Relationship',
            children: data.relationDesc ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'spouseMobNumber',
            label: 'Spouse Mobile No',
            children: data.spouseMobNumber ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'spouseJob',
            label: 'Spouse Job',
            children: data.spouseJob ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'spouseKtp',
            label: 'Spouse NIK',
            children: data.spouseKtp ?? '-',
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'gender',
            label: 'Gender',
            children: data.gender == "M" ? "Male" : "Female",
            labelStyle: {
                color: '#102C57',
                fontWeight: 600,
                width: '40%'
            }
        },
        {
            key: 'ktp',
            label: '',
            children:
                <div className='flex justify-between w-full'>

                    <Space size="middle">
                        {/* <Link target="_blank" to={`/indo-digital-loan/auth/applications/internal-crib/${data.cltIdx}`} className="btn btn-info btn-sm"><i className="bx bxs-report font-size-16 align-middle me-2"></i>Internal Crib</Link> */}
                        <Button type="primary" target="_blank" href={`/indo-digital-loan/auth/applications/internal-crib/${data.cltIdx}`}>Internal Crib</Button>
                    </Space>
                </div>,

        },
    ]

    const {
        customerData,
        contactDetails,
        addressDetails,
        businessDetails,
        spouseDetails,
    } = useSelector((state: any) => state.Application)

    const [imageCategory, setImageCategory] = useState<IImageCategory>({ mainCategory: '', subCategory: '' })

    return (
        <div
            style={{
                fontWeight: 300
            }}
        >
            {customerData.fetching ?
                <div className='w-full h-32 flex justify-center'><Spin /></div>
                :
                <div>
                    <PopupImage open={openImage} setOpen={setOpenImage} mainCategory={imageCategory.mainCategory} subCategory={imageCategory.subCategory} />
                    <Descriptions
                        title={
                            <Title
                                level={5}
                                title='Personal Details'
                                style={{ color: '#7C3626' }}
                            />
                        }
                        column={
                            screens.xs ? 1 : 3
                        }
                        items={customerData.data ? items(customerData.data) : []}
                        size='small'
                    />
                    <div className='flex justify-end gap-2'>
                        <Button onClick={() => {
                            setImageCategory({ mainCategory: 'CLIENT_IDENTIFICATION', subCategory: 'CUSTOMER_ID' })
                            setOpenImage(true)
                        }}>
                            NIK
                        </Button>
                        <Button onClick={() => {
                            setImageCategory({ mainCategory: 'CLIENT_IDENTIFICATION', subCategory: 'FAMILY_CARD' })
                            setOpenImage(true)
                        }}>Family Card</Button>
                        <Button onClick={() => {
                            setImageCategory({ mainCategory: 'CLIENT_IDENTIFICATION', subCategory: 'CUSTOMER_IMAGE' })
                            setOpenImage(true)
                        }}>Customer Image</Button>
                    </div>
                    <Divider />


                    <Title
                        level={5}
                        title='Contact Details'
                        style={{ color: '#7C3626' }}
                    />

                    <div className={
                        screens.xs
                            ? 'grid grid-cols-1 gap-5 pt-2'
                            : 'grid grid-cols-3 gap-5 pt-2'
                    }>
                        {contactDetails?.data?.map((contact: any, index: any) => {
                            return <div
                                style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                                className='p-5 rounded-md  font-sans'
                                key={index}
                            >
                                <Descriptions
                                    key={index}
                                    column={
                                        1
                                    }
                                    items={contact ? itemsContact(contact) : []}
                                    size='small'
                                />
                            </div>

                        })}
                    </div>

                    <Divider />

                    <Title
                        level={5}
                        title='Address Details'
                        style={{ color: '#7C3626' }}
                    />

                    <div className={
                        screens.xs
                            ? 'grid grid-cols-1 gap-5 pt-2'
                            : 'grid grid-cols-3 gap-5 pt-2'
                    }>
                        {addressDetails?.data?.
                            filter((row: any) => row.addressType == 'TEMPORARY')?.
                            map((address: any, index: any) => {
                                return <div
                                    style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                                    className='p-5 rounded-md  font-sans'
                                    key={index}
                                >
                                    <Descriptions
                                        key={index}
                                        column={
                                            1
                                        }
                                        items={address ? itemsAddressType2(address) : []}
                                        size='small'
                                    />
                                    <div className='flex flex-col sm:flex-row justify-end gap-2'>
                                        <Button onClick={() => {
                                            setImageCategory({ mainCategory: 'RESIDENCIAL_IMAGES', subCategory: 'RESIDENCE_LOCATION_TAGGING' })
                                            setOpenImage(true)
                                        }}>
                                            Location
                                        </Button>
                                        <Button onClick={() => {
                                            setImageCategory({ mainCategory: 'RESIDENCIAL_IMAGES', subCategory: 'RESIDENCE_IMAGE' })
                                            setOpenImage(true)
                                        }}>Image</Button>
                                        <Button onClick={() => {
                                            setImageCategory({ mainCategory: 'RESIDENCIAL_IMAGES', subCategory: 'RESIDENCE_OWNERSHIP_PROOF' })
                                            setOpenImage(true)
                                        }}>Ownership</Button>
                                    </div>
                                </div>
                            })}

                        {addressDetails?.data?.
                            filter((row: any) => row.addressType != 'TEMPORARY')?.
                            map((address: any, index: any) => {
                                return <div
                                    style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                                    className='p-5 rounded-md  font-sans'
                                    key={index}
                                >
                                    <Descriptions
                                        key={index}
                                        column={
                                            1
                                        }
                                        items={address ? itemsAddressType1(address) : []}
                                        size='small'
                                    />
                                    {address.addressType === 'BUSINESS' &&
                                        <div className='flex flex-col sm:flex-row justify-end gap-2'>
                                            <Button onClick={() => {
                                                setImageCategory({ mainCategory: 'BUSINESS_IMAGE', subCategory: 'BUSINESS_LOCATION_TAGGING' })
                                                setOpenImage(true)
                                            }}>
                                                Business Location
                                            </Button>
                                        </div>
                                    }
                                </div>
                            })}
                    </div>

                    <Divider />

                    <Descriptions
                        title={
                            <Title
                                level={5}
                                title='Business Details'
                                style={{ color: '#7C3626' }}
                            />
                        }
                        column={screens.xs ? 1 : 3}
                        items={businessDetails.data ? businessItems(businessDetails.data) : []}
                        size='small'
                    />
                    <div className='flex flex-col sm:flex-row justify-end gap-2'>
                        <Button onClick={() => {
                            setImageCategory({ mainCategory: 'BUSINESS_IMAGE', subCategory: 'BUSINESS_IMAGE' })
                            setOpenImage(true)
                        }}>
                            Business Image
                        </Button>
                    </div>

                    <Divider />

                    <Descriptions
                        title={
                            <Title
                                level={5}
                                title='Spouse Details'
                                style={{ color: '#7C3626' }}
                            />
                        }
                        column={
                            screens.xs ? 1 : 3
                        }
                        items={spouseDetails.data ? spouseItems(spouseDetails.data) : []}
                        size='small'
                    />
                    <div className='flex flex-col sm:flex-row justify-end gap-2'>
                        <Button onClick={() => {
                            setImageCategory({ mainCategory: 'SPOUSE_IMAGES', subCategory: 'SPOUSE_ID' })
                            setOpenImage(true)
                        }}>
                            Spouse Id
                        </Button>
                        <Button onClick={() => {
                            setImageCategory({ mainCategory: 'SPOUSE_IMAGES', subCategory: 'SPOUSE_IMAGE' })
                            setOpenImage(true)
                        }}>
                            Spouse Image
                        </Button>
                    </div>

                </div>
            }
        </div>
    );
}
