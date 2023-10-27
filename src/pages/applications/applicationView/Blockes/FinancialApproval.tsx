import { Button, Descriptions, DescriptionsProps, Input, InputNumber, Space } from 'antd';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../../../store/store';

export interface IFinancialApprovalProps {
}

const items: (data: any) => DescriptionsProps['items'] = (data) => [
    {
      key: 'Product',
      label: 'Product',
      children: data.pTrhdLType, //initialData?.centerCode,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    }, 
    {
        key: 'fundingPurpose',
        label: 'Funding Purpose',
        children: data.fundingPurpose, //initialData?.centerCode,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '40%'
        }
    },
    {
        key: 'fundingPurpose',
        label: 'Funding Purpose',
        children: data.fundingPurpose, //initialData?.centerCode,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '40%'
        }
    },
    {
        key: 'subProduct',
        label: 'Sub Product',
        children: data.pTrhdBus, //initialData?.centerCode,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '40%'
        }
    },
    {
        key: 'pTrhdTr',
        label: 'Rate',
        children: data.pTrhdTr, //initialData?.centerCode,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '40%'
        }
    },{
        key: '',
        label: '',
        children: '', //initialData?.centerCode,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '40%'
        }
    },
]

export default function FinancialApproval (props: IFinancialApprovalProps) {

    const [editLoan, setEditLoan] = useState(false)
    const [editTerm, setEditTerm] = useState(false)
    const [enableSave, setEnableSave] = useState(false)

    const {
        financialDetails
    } = useSelector((state: any) => state.Application)
    
  return (
    <div  
    style={{
        fontWeight: 300
    }}
    >
      <Descriptions 
        column={
          3
        }
        items={financialDetails.data? items(financialDetails.data): []} 
        size='small'
    />  
    <div className='grid grid-cols-3 gap-0 pt-2'>
        <div className='pr-6'>
            <Space.Compact style={{ width: '100%' }}>
            <InputNumber 
                addonBefore={<p style={{color:'#102C57', fontWeight: 600}}>Loan Amount</p>} 
                value={financialDetails.data?.pTrhdLocCost}
                readOnly={!editLoan}
                onChange={(e) => {
                    actions.updateLoan(e.target.value)
                }}
            />
            <Button type="primary" onClick={() => setEditLoan(!editLoan)}>{editLoan? 'Done' :'Edit' }</Button>
            </Space.Compact>
        </div>
        <div className='pr-6'>
            <Space.Compact style={{ width: '100%' }}>
            <InputNumber
                addonBefore={<p style={{color:'#102C57', fontWeight: 600}}>Tearm (Tenor)</p>}
                value={financialDetails.data?.pTrhdTerm}
                readOnly={!editTerm}
                onChange={(e) => {
                    actions.updateLoan(e.target.value)
                }}
            />
            <Button type="primary" onClick={() => setEditTerm(!editTerm)}>{editTerm? 'Done' :'Edit'}</Button>
            </Space.Compact>
        </div>
        <div>
            <Button 
                disabled = {!enableSave}
                type='primary' onClick={() => {

                }}
            >Save Financial Approval</Button>
        </div>
    </div>
    </div>
  );
}
