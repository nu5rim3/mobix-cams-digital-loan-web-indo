import { Descriptions, Button, Space, DescriptionsProps, Divider, Grid, Spin } from 'antd';
import * as React from 'react';
import { useSelector } from 'react-redux';
import Title from '../../../../components/Typography/Tytle';
import formatAddress from '../../../../utils/getAddressByObjects';
import { Link } from "react-router-dom";
export interface GuarantorDetailsProps {
}

const items: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'fullName',
        label: 'Full Name',
        children: data.fullName,
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
        key: 'familyCard',
        label: 'Family Card',
        children: data.familyCard,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'busJoint',
        label: 'Bus Joint',
        children: data.busJoint,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    // {
    //     key: 'callVerificationStatus',
    //     label: 'Call Verification Status',
    //     children: data.callVerificationStatus?? '-',
    //     labelStyle: {
    //         color: '#102C57',
    //         fontWeight: 600,
    //         width: '40%'
    //     }
    // },
    {
        key: 'ktp',
        label: 'NIK Number',
        children: data.ktp,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'Address',
        label: 'Address',
        children: formatAddress({
            address1: data.addLine1,
            address2: data.addLine2,
            address3: data.addLine3
        }),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '40%'
        }
    },
    {
        key: 'ex1',
        label: '',
        children: ''
    },
    {
        key: 'ex2',
        label: '',
        children: ''
    },
    {
        key: 'ex3',
        label: '',
        children: //data?.ktp,
        <div className='flex justify-between w-full'>

            <Space size="middle">
                {/* <Link target="_blank" to={`/indo-digital-loan/auth/applications/internal-crib/${data.cltIdx}`} className="btn btn-info btn-sm">Internal Crib</Link> */}
                <Button type="primary" target="_blank" href={`/indo-digital-loan/auth/applications/internal-crib/${data.cltIdx}`}>Internal Crib</Button>
            </Space>
        </div>,

    }
]

export default function GuarantorDetails(props: GuarantorDetailsProps) {

    const {
        guarantorDetails
    } = useSelector((state: any) => state.Application)

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint()

    return (
        <div
            style={{
                fontWeight: 300
            }}
        >
            {guarantorDetails.fetching ?
                <div className='w-full h-32 flex justify-center'>
                    <Spin />
                </div>
                :
                <div>
                    {guarantorDetails ?.data ?.
                        filter((guarantor: any) => guarantor.cltType === 'G').
                        map((guarantor: any, index: any) => {
                            return <div
                                key={index}
                                style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                                className='p-5 rounded-md  font-sans mb-5'
                            >
                                <Descriptions
                                    key={index}
                                    column={screens.xs ? 1 :
                                        3
                                    }
                                    items={guarantor ? items(guarantor) : []}
                                    size='small'
                                />

                                {/* <Divider/> */}
                            </div>
                        })}
                </div>
            }


        </div>
    );
}
