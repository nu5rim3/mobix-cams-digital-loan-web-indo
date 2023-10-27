import { Descriptions, DescriptionsProps, Input, Tag } from 'antd';
import * as React from 'react';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';

export interface IOnboardingViewProps {
}

const items: (data: any) => DescriptionsProps['items'] = (data) => [
    {
      key: '1',
      label: 'SLICK Status',
      children:  data?.status === "A" 
      ? <Tag color='green' key={data?.status}>
          Active
      </Tag>
      :<Tag color='yellow' key={data?.status}>
        {data?.status}
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
        children: <Tag color='yellow'>{data.status}</Tag>,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '60%'
        }
      },
]

export default function OnboardingView (props: IOnboardingViewProps) {
    
    const customerData = useSelector((state: any) => state.Application.customerData)

  return (
    <div
        style={{
            fontWeight: 300
        }} 
        className='grid grid-cols-2 gap-5 pt-2'
    >
        <Descriptions 
            column={1}
            items={customerData.data? items(customerData.data): []} 
            size='small'
        /> 

        <Input value={''} readOnly/>
    </div>
  );
}
