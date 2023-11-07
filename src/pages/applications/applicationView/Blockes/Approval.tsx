import { Divider, Form, Table, Tag, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useEffect, useState} from 'react';
import ButtonContainer from '../../../../components/Buttons/Button';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { API } from '../../../../services/Services';
import { useNavigate } from 'react-router-dom';

export interface IApprovalProps {
  fileList: any
}

export default function Approval ({
  fileList
}: IApprovalProps) {
    // approvalSteps

    const {
      customerData,
      approvalSteps,
      financialDetailsSavePending,
      financialDetails,
    } = useSelector((state: any) => state.Application)
    const {
      selectedRole,
      userData
  } = useSelector((state: any) => state.AppData)

    const [roleWiseApproval, setRoleWiseApproval] = useState<any[]>([])

    useEffect(() => {
      if(selectedRole){
        if(selectedRole === 'CSA'){
          return setRoleWiseApproval(['Return', 'Recommend'])
        }
        if(selectedRole === 'CA'){
          return setRoleWiseApproval(['Return', 'Not Recommend', 'Recommend']) // DIRECT TO NEXT
        }
        if(selectedRole === 'BM'){
          return setRoleWiseApproval(['Return', 'Reject', 'Approve'])
        }
        if(selectedRole === 'AM'
        || selectedRole === 'RM'
        || selectedRole === 'DIR'
        || selectedRole === 'BOD1'
        || selectedRole === 'BOD2'
        || selectedRole === 'BOD3'
        ){
          return setRoleWiseApproval(['Reject', 'Approve'])
        }
        if(selectedRole === 'ADMIN'){
          return setRoleWiseApproval([])
        }else{
          return setRoleWiseApproval([])
        }
      }
    },[selectedRole])


    const [addingData, setAddingData] = useState('')
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const columns: ColumnsType<any> = [
      {
        title: 'Status',
        dataIndex: 'stepStatus',
        key: 'stepStatus',
        render: (_, { stepStatus }) => (
          <><Tag color='green' key={stepStatus}>
              {stepStatus}
            </Tag>
          </>
      ),
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
      },
      {
        title: 'createdBy',
        dataIndex: 'createdBy',
        key: 'createdBy',
      },
      {
        title: 'lastModifiedDate',
        key: 'lastModifiedDate',
        dataIndex: 'lastModifiedDate',
        render: (_, { lastModifiedDate }) => {
          const date = new Date(lastModifiedDate);

          const localDate = date.toLocaleDateString();
          const localTime = date.toLocaleTimeString();

          return <>{localDate} - {localTime}</>
        }
      },
    ];

    const genarateType = (type: string) => {
      if(type == 'Recommend'){
        return 'PROCEED'
      }
    }

    const handleSubmit = (type: string) => {
      if(financialDetailsSavePending){
        return notification.warning({
          message: 'Please save the updated Financial Approval to countinue.'
        })
      }
      form.validateFields(['comment'])
      .then(async () => {
        try{
          setAddingData(type)
          const data = {
            appraisalIdx: customerData.data.appraisalId,
            stepStatus: type,
            stepAction: genarateType(type),
            appraisalType: customerData.data.appraisalType,
            loanProduct: financialDetails.data.pTrhdLType,
            loanAmount: financialDetails.data.pTrhdLocCost,
            loanTerm: financialDetails.data.pTrhdTerm,
            comment: form.getFieldValue('comment'),
            lastModifiedBy: userData.data.idx,

            document: fileList?.map((file: any) => {
              
             return { 
              stkIdx: customerData.data.cusIdx,
              cltIdx: customerData.data.cltIdx,
              centerIdx: customerData.data.centerIdx,
              appraisalIdx: customerData.data.appraisalType,
              imgMasterCategory: "SECOND_MEETING_APPROVAL",
              imgSubCategory: "BM_LEVEL",
              imgOriginalName: file.name,
              imgContentType: file.type,
              image: file.originFileObj
            }
            })
          }
          // console.log("data", fileList)
          // const save = await API.approvalServices.createScondMeetingStep(data)
          const save = await API.approvalServices.createStep(data)

          notification.success({
            message: 'Application Updated Successfully.'
          })
          // if()
          navigate('/applications')
        }
        catch(err){
          notification.error({
            message: 'Application update failed'
          })
        }
        finally{
          setAddingData(type)
        }
      })
    }
    
  return (
    <div>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 26 }}
          layout="vertical"
          // disabled={componentDisabled}
          // style={{ maxWidth: 600 }}
      >
        {roleWiseApproval.length
          ?
          <Form.Item label="Comment" name='comment' rules={[
              {
                required: true,
              },
            ]}>
            <TextArea rows={4} placeholder='Add Comment here' />
          </Form.Item>
        : null}

        <div className='flex justify-center'>
            {roleWiseApproval.map((type: any) => {
              return (
                <ButtonContainer 
                  type='primary' 
                  label={type}
                  loading={addingData? true: false} 
                  size='large' 
                  onClick={() => handleSubmit(type)}
                  className='mr-1 ' 
                  shape='round'
                />
              )
            })}
        </div>
      </Form>
      <Divider/>
      <div className='mt-5'>
        <Title 
                level={5}
                title='Application History'
          /> 

        <Table
          className='w-1/2'
          showHeader={false}
          bordered={false}
          columns={columns}
          pagination={false}
          dataSource={
            approvalSteps.data?.approvalStepDtoList?? []}
        />
      </div>
    </div>
  );
}
