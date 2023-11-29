import { Button, Descriptions, DescriptionsProps, Input, InputNumber, Space, Spin, notification } from 'antd';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../../../store/store';
import { API } from '../../../../services/Services';
import getCurrency from '../../../../utils/getCurrency';

export interface IFinancialApprovalProps {
}

const items: (data: any) => DescriptionsProps['items'] = (data) => [
    {
      key: 'Product',
      label: 'Product',
      children: data?.productName || data?.pTrhdLType, //initialData?.centerCode,
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
    },
    {
      key: 'instalment',
      label: 'Instalment',
      children: getCurrency(Number(data?.facilityDetails?.[0]?.instalment)), //initialData?.centerCode,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: 'totalReceivable',
      label: 'Total Receivable',
      children: getCurrency(Number(data?.totalReceivable)), //initialData?.centerCode,
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
    const [tcSaveLoading, setTCSaveLoading] = useState(false)
    
    const {
      customerData,
      financialDetails,
      financialDetailsSavePending
    } = useSelector((state: any) => state.Application)
    
    const [newLoan, setNewLoan] = useState('')
    const [newTearm, setNewTearm] = useState('')
    
    const {
      selectedRole
  } = useSelector((state: any) => state.AppData)

    const updateFinancialDetails = async() => {

      try{
        setTCSaveLoading(true)

        const calculateTc = await API.financialServices.calculateTc(
          {
            ...financialDetails?.data,
            tcNo: null
          }
        )

        const newTcNo = calculateTc?.data?.object?.tcNo

        const save = await API.financialServices.saveTCByAppraisal(
          customerData?.data?.appraisalId,
          customerData?.data?.cltIdx,
          {
            ...financialDetails?.data,
            tcNo: newTcNo
          }
        )
        
        if(save.data.code == "ERROR"){
          return notification.error({
            message: 'An Error occured while updating TC details'
          })
        }

        const updateFusion = await API.financialServices.saveTCToFusion(
          {
            tcNo: newTcNo,
            mode: "P"
          }
        )

        if(updateFusion.data.message == "ERROR"){
          return notification.error({
            message: 'An Error occured while updating TC details to Fusion'
          })
        }

        actions.financialDSavePendingUpdate(false)
        notification.success({
          message: 'TC details updated successfullly'
        })
      }
      catch(err){
        notification.error({
          message: 'TC details update Failed'
        })
      }
      finally{
        setTCSaveLoading(false)
      }
    }

    useEffect(() => {
      if(financialDetails.data){
        setNewTearm(financialDetails.data?.pTrhdTerm)
        setNewLoan(financialDetails.data?.pTrhdLocCost)
      }
    },[financialDetails.data])



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
                      value={newLoan}
                      readOnly={!editLoan}
                      onChange={(e:any) => {
                          // actions.updateLoan(e)
                          setNewLoan(e)
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  />
                  <Button type="primary" 
                    onClick={() => {
                      setEditLoan(!editLoan)
                      if(editLoan){
                        if((
                          selectedRole === 'AM'
                          || selectedRole === 'RM'
                          || selectedRole === 'BOD1'
                          || selectedRole === 'BOD2'
                          || selectedRole === 'BOD3'
                          ) && financialDetails?.data?.daLimit < newLoan){
                          setNewLoan(financialDetails.data?.pTrhdLocCost)
                          return notification.error({
                            message: `Loan Amount Cannot be Exceeded Your Approval Limit ${getCurrency(financialDetails?.data?.daLimit)}`
                          })
                        }
                        actions.updateLoan(newLoan)
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
                      value={newTearm}
                      readOnly={!editTerm}
                      onChange={(e:any) => {
                         setNewTearm(e)
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  />
                  <Button type="primary" onClick={
                    () => {
                      setEditTerm(!editTerm)
                      if(editTerm){
                        actions.updateTerm(newTearm)
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
                      loading={tcSaveLoading}
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
