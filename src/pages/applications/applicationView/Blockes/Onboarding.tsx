import { Descriptions, DescriptionsProps, Input, Spin, Tag } from 'antd';
import React, {useState, useEffect} from 'react';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';

export interface IOnboardingViewProps {
}

const items: (data: any) => DescriptionsProps['items'] = (data) => [
    {
      key: '1',
      label: 'SLIK Status',
      children:  data?.slikStatus === "A" 
      ? <Tag color='green' key={data?.slikStatus}>
          Active
      </Tag>
      :<Tag color='yellow' key={data?.slikStatus}>
        {data?.slikStatus}
        </Tag>,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '60%'
      }
    },
    {
        key: '2',
        label: 'Call Verification Status',
        children: <>
          {data.stepAction === 'PENDING'?
            <Tag color='yellow'>{data.stepStatus}</Tag>
          : data.stepAction === 'PROCEED'?
            <Tag color='green'>VERIFIED</Tag>
          : <Tag color='green'>{data.status}</Tag>
          }
        </> ,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '60%'
        }
      },
]

const itemsGroup: (data: any) => DescriptionsProps['items'] = (data) => [
  {
    key: '1',
    label: 'Center Code',
    children:  data.fusionCenterCode,
    labelStyle: {
      color: '#102C57',
      fontWeight: 600,
      width: '60%'
    }
  },
  {
      key: '2',
      label: 'Center Name',
      children: data.centerName,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '60%'
      }
    },
    {
      key: '2',
      label: 'Group Number',
      children: data.groupIdx,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '60%'
      }
    },
]

export default function OnboardingView (props: IOnboardingViewProps) {
    
    const {
      customerData,
      approvalSteps,
      guarantorDetails
    } = useSelector((state: any) => state.Application)
    const [callVerification, setCallVerification] = useState<any>({})

    useEffect(() => {
      const getCallVerification =approvalSteps?.data?.approvalStepDtoList?.find((row: any) => {
        return row.roleCode === 'CSA'
      })
      setCallVerification(getCallVerification? getCallVerification : {})
    },[approvalSteps.data])

    console.log("guarantorDetails", guarantorDetails)

  return (
    customerData.fetching || guarantorDetails.fetching?
      <div className='w-full h-32 flex justify-center'>
        <Spin/>
      </div>
    :
    <>
    <div
        style={{
            fontWeight: 300
        }} 
        className='grid grid-cols-2 gap-5 pt-2'
    >
        <Descriptions 
            column={1}
            items={customerData?.data && callVerification?  items({
              ...customerData.data,
              ...callVerification,
              slikStatus: (guarantorDetails.data?.find((type: any) => type.cltType === "C").slkStatus)
            }): []} 
            size='small'
        /> 

        <Input value={callVerification?.comment} readOnly/>

    </div>

    <div 
      className='mt-5'
      style={{
        fontWeight: 300
      }} 
    >
      {guarantorDetails.data?.find((type: any) => type.cltType === "C")?.verificationType === "GRPL" ?
        <Descriptions 
            column={3}
            items={guarantorDetails.data?  itemsGroup(guarantorDetails.data.find((type: any) => type.cltType === "C")): []} 
            size='small'
        /> 
      : null
      }
    </div>
    </>
  );
}
