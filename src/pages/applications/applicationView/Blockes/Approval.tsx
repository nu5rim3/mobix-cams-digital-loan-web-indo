import { Divider, Form, Table, Tag, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';
import ButtonContainer from '../../../../components/Buttons/Button';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { API } from '../../../../services/Services';

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
      financialDetails
    } = useSelector((state: any) => state.Application)
    const [addingData, setAddingData] = useState('')

    const [form] = Form.useForm();
    const columns: ColumnsType<any> = [
      {
        title: 'Status',
        dataIndex: 'secondMeetingStepStatus',
        key: 'secondMeetingStepStatus',
        render: (_, { secondMeetingStepStatus }) => (
          <>
            {secondMeetingStepStatus === "A" 
            ? <Tag color='green' key={secondMeetingStepStatus}>
                {secondMeetingStepStatus}
              </Tag>
            :<Tag color='green' key={secondMeetingStepStatus}>
              {secondMeetingStepStatus}
            </Tag>
            }
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
        title: 'lastModifiedBy',
        dataIndex: 'lastModifiedBy',
        key: 'lastModifiedBy',
      },
      {
        title: 'lastModifiedDate',
        key: 'lastModifiedDate',
        dataIndex: 'lastModifiedDate',
      },
    ];

    const handleSubmit = (type: string) => {
      if(financialDetailsSavePending){
        return notification.warning({
          message: 'Please save the updated Financial Approval to countinue.'
        })
      }
      form.validateFields(['comment'])
      .then(() => {
        setAddingData(type)
        const data = {
          appraisalIdx: customerData.data.appraisalId,
          secondMeetingStepAction: type,
          secondMeetingStepStatus: type,
          appraisalType: customerData.data.appraisalType,
          loanProduct: financialDetails.data.pTrhdLType,
          loanAmount: financialDetails.data.pTrhdLocCost,
          loanTerm: financialDetails.data.pTrhdTerm,
          comment: form.getFieldValue('comment'),
          document: fileList?.map((file: any) => {
            
           return { 
            stkIdx: "",
            cltIdx: "",
            centerIdx: "",
            appraisalIdx: customerData.data.appraisalType,
            imgMasterCategory: "SECOND_MEETING_APPROVAL",
            imgSubCategory: "BM_LEVEL",
            imgOriginalName: "IMG_8789.jpg",
            imgContentType: "JPG",
            image: ''
          }
          })
        }
        console.log("data", fileList)
        // API.approvalServices.createScondMeetingStep(data)
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
         <Form.Item label="Comment" name='comment' rules={[
            {
              required: true,
            },
          ]}>
          <TextArea rows={4} placeholder='Add Comment here' />
        </Form.Item>
        <div className='flex justify-center'>
            <ButtonContainer 
              type='primary' 
              label='Reject' 
              loading={false} 
              size='large' 
              onClick={() => handleSubmit('reject')}
              className='mr-1 w-28' 
              shape='round'
            />
            <ButtonContainer 
              type='primary' 
              label='Return' 
              loading={false} 
              size='large' 
              onClick={() => handleSubmit('return')} 
              className='mr-1 w-28' 
              shape='round'
              />
            <ButtonContainer 
              type='primary' 
              label='Approve' 
              loading={false} 
              size='large' 
              onClick={() => handleSubmit('APPROVED')} 
              className='mr-1 w-28' 
              shape='round'
            />
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
            approvalSteps.data?.secondMeetingApprovalStepDtoList?? []}
        />
      </div>
    </div>
  );
}
