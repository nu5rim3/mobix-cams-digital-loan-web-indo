import { Descriptions, DescriptionsProps, Grid, Input, Spin, Tag } from 'antd';
import React, {useState, useEffect} from 'react';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';

export interface IOnboardingViewProps {
}

const items: (data: any) => DescriptionsProps['items'] = (data) => [
    {
      key: 'slickStatus',
      label: 'SLIK Status',
      children:  data?.slikStatus === "C" 
      ? <Tag color='yellow' key={data?.slikStatus}>
          CLAIMABLE
      </Tag>
      :data?.slikStatus === "OK" ?
        <Tag color='green' key={data?.slikStatus}>
            OK
        </Tag>
      :data?.slikStatus === "NOT_OK" ?
        <Tag color='red' key={data?.slikStatus}>
          NOT OK
      </Tag>
      :<Tag key={data?.slikStatus}>
        {data?.slikStatus}
        </Tag>,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '60%'
      }
    },
    {
        key: 'callStatus',
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
    key: 'fusionCenterCode',
    label: 'Center Code',
    children:  data.fusionCenterCode,
    labelStyle: {
      color: '#102C57',
      fontWeight: 600,
      width: '60%'
    }
  },
  {
      key: 'centerName',
      label: 'Center Name',
      children: data.centerName,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '60%'
      }
    },
    {
      key: 'groupIdx',
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

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint()

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
        className={
          screens.xs
          ? 'grid grid-cols-1 gap-5 pt-2'
          :'grid grid-cols-2 gap-5 pt-2'
        }
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
            column={screens.xs? 1 : 3}
            items={guarantorDetails.data?  itemsGroup(guarantorDetails.data.find((type: any) => type.cltType === "C")): []} 
            size='small'
        /> 
      : null
      }
    </div>
    </>
  );
}
