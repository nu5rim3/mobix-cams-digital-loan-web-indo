import { Button, Descriptions, DescriptionsProps, Input, InputNumber, Space, Spin, notification } from 'antd';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../../../store/store';
import { API } from '../../../../services/Services';

export interface IFinancialApprovalProps {
}

const items: (data: any) => DescriptionsProps['items'] = (data) => [
    {
      key: 'Product',
      label: 'Product',
      children: data?.data?.productName || data?.pTrhdLType, //initialData?.centerCode,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    }, 
    {
        key: 'fundingPurpose',
        label: 'Funding Purpose',
        children: data?.fundingPurpose, //initialData?.centerCode,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '40%'
        }
    },
    {
        key: 'subProduct',
        label: 'Sub Product',
        children: data?.pTrhdBus, //initialData?.centerCode,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '40%'
        }
    },
    {
        key: 'pTrhdTr',
        label: 'Rate',
        children: data?.pTrhdTr, //initialData?.centerCode,
        labelStyle: {
          color: '#102C57',
          fontWeight: 600,
          width: '40%'
        }
    },{
        key: 'ex1',
        label: '',
        children: ''
    },
]

export default function FinancialApproval (props: IFinancialApprovalProps) {

    const [editLoan, setEditLoan] = useState(false)
    const [editTerm, setEditTerm] = useState(false)
    const [tcSaveLoading, setTCSaveLoading] = useState(false)

    const {
        customerData,
        financialDetails,
        financialDetailsSavePending
    } = useSelector((state: any) => state.Application)

    const {
      selectedRole
  } = useSelector((state: any) => state.AppData)

    const updateFinancialDetails = async() => {
      try{
        setTCSaveLoading(true)
        const save = await API.financialServices.saveTCByAppraisal(
          customerData?.data?.appraisalId,
          customerData?.data?.cltIdx,
          financialDetails?.data
        )

        if(save.data.code == "ERROR"){
          return notification.error({
            message: 'An Error occured while updating TC details'
          })
        }
        actions.financialDSavePendingUpdate(false)
        notification.success({
          message: 'TC details updated successfullly'
        })
      }
      catch(err){

      }
      finally{
        setTCSaveLoading(false)
      }
    }



  return (
    <div  
    style={{
        fontWeight: 300
    }}
    >
      {financialDetails.fetching?
        <div className='w-full h-32 flex justify-center'>
          <Spin/>
        </div>
      :
        <div>
          <Descriptions 
            column={
              3
            }
            items={financialDetails.data? items(financialDetails?.data): []} 
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
                          actions.updateLoan(e)
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  />
                  <Button type="primary" 
                    onClick={() => {
                      setEditLoan(!editLoan)
                      if(editLoan){
                        actions.financialDSavePendingUpdate(true)
                      }
                    }}
                    disabled={
                      selectedRole === 'CSA'? true: false
                    }
                  >
                    {editLoan? 'Done' :'Edit' }
                  </Button>
                  </Space.Compact>
              </div>
              <div className='pr-6'>
                  <Space.Compact style={{ width: '100%' }}>
                  <InputNumber
                      addonBefore={<p style={{color:'#102C57', fontWeight: 600}}>Tearm (Tenor)</p>}
                      value={financialDetails.data?.pTrhdTerm}
                      readOnly={!editTerm}
                      onChange={(e) => {
                          actions.updateTerm(e)
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  />
                  <Button type="primary" onClick={
                    () => {
                      setEditTerm(!editTerm)
                      if(editTerm){
                        actions.financialDSavePendingUpdate(true)
                      }
                    }}
                    disabled={
                      selectedRole === 'CSA'? true: false
                    }
                  >
                    {editTerm? 'Done' :'Edit'}
                  </Button>
                  </Space.Compact>
              </div>
              <div>
                  <Button 
                      disabled = {!financialDetailsSavePending}
                      type='primary' onClick={() => {
                        updateFinancialDetails()
                      }}
                  >Save Financial Approval</Button>
              </div>
          </div>
        </div>
      }
    </div>
  );
}
