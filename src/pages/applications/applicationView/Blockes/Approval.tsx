import { Divider, Form, Table, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import * as React from 'react';
import ButtonContainer from '../../../../components/Buttons/Button';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';

export interface IApprovalProps {
  fileList: any
}

export default function Approval ({
  fileList
}: IApprovalProps) {
    // approvalSteps

    const {approvalSteps} = useSelector((state: any) => state.Application)

    console.log("approvalSteps", approvalSteps)

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
    
  return (
    <div>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 26 }}
        layout="vertical"
        // disabled={componentDisabled}
        // style={{ maxWidth: 600 }}
      >
        <Form.Item label="Comment">
          <TextArea rows={4} placeholder='Add Comment here'/>
        </Form.Item>
        <div className='flex justify-center'>
            <ButtonContainer type='primary' label='Reject' loading={false} size='large' onClick={() => console.log("hello", fileList)} className='mr-1 w-28' shape='round'/>
            <ButtonContainer type='primary' label='Return' loading={false} size='large' onClick={() => console.log("hello")} className='mr-1 w-28' shape='round'/>
            <ButtonContainer type='primary' label='Approve' loading={false} size='large' onClick={() => console.log("hello")} className='mr-1 w-28' shape='round'/>
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
