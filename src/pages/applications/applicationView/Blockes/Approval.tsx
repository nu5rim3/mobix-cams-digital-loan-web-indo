import { Divider, Form, Table, Tag, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useEffect, useState} from 'react';
import ButtonContainer from '../../../../components/Buttons/Button';
import Title from '../../../../components/Typography/Tytle';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { API } from '../../../../services/Services';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { genarateStepAction, genarateStepStatus } from '../../../../utils/setpsGenaration';
import fileToBase64Async from '../../../../utils/fileToBase64Async';

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
    const [isSecondMeeting, setIsSecondMeeting] = useState<boolean>(false)

    useEffect(() => {
      if(selectedRole){
        if(selectedRole === 'CSA'){
          return setRoleWiseApproval(['Return', 'Verifed'])
        }
        if(selectedRole === 'CA'){
          return setRoleWiseApproval(['Return', 'Not Recommend', 'Recommend']) // DIRECT TO NEXT
        }
        if(selectedRole === 'BM' && isSecondMeeting){
          return setRoleWiseApproval(['Reject', 'Approve'])
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
    },[selectedRole, isSecondMeeting])


    const [addingData, setAddingData] = useState('')
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const columns: ColumnsType<any> = [
      {
        title: 'Status',
        dataIndex: 'stepStatus',
        key: 'stepStatus',
        render: (_, { stepStatus }) => (
          stepStatus === 'PENDING' || stepStatus === 'RETURNED' || stepStatus === 'SECOND MEETING - PENDING' ?
          <Tag color='yellow' key={stepStatus}>
              {stepStatus}
          </Tag>
          :<Tag color='green' key={stepStatus}>
              {stepStatus}
          </Tag>
      ),
      },
      {
        title: 'Role',
        dataIndex: 'roleDescription',
        key: 'roleDescription',
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
      },
      {
        title: 'created By',
        dataIndex: 'lastModifiedBy',
        key: 'lastModifiedBy',
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



    const handleSubmit = (type: string) => {
      if(financialDetailsSavePending){
        return notification.warning({
          message: 'Please save the updated Financial Approval to continue.'
        })
      }
      if((selectedRole === 'CA' || selectedRole == 'BM') && !fileList.length && (type === 'Recommend' || type === 'Approve') ){
        return notification.warning({
          message: 'Please Upload Image to continue'
        })
      }
      form.validateFields(['comment'])
      .then(async () => {
        try{
          setAddingData(type)
          let data

          if(isSecondMeeting){
            data = { 
              appraisalIdx: customerData.data.appraisalId,
              secondMeetingStepAction: genarateStepStatus(type, selectedRole),
              secondMeetingStepStatus: genarateStepAction(type, selectedRole, isSecondMeeting),
              appraisalType: approvalSteps?.data?.approvalStepDtoList?.[approvalSteps?.data?.approvalStepDtoList?.length - 1]?.appraisalType,
              loanProduct: financialDetails.data.pTrhdLType,
              loanAmount: financialDetails.data.pTrhdLocCost,
              loanTerm: financialDetails.data.pTrhdTerm,
              comment: form.getFieldValue('comment')
            }
          }else{
            data = {
              appraisalIdx: customerData.data.appraisalId,
              stepStatus: genarateStepStatus(type, selectedRole),
              stepAction: genarateStepAction(type, selectedRole, isSecondMeeting),
              appraisalType: approvalSteps?.data?.approvalStepDtoList?.[approvalSteps?.data?.approvalStepDtoList?.length - 1]?.appraisalType, //customerData.data.appraisalType,
              loanProduct: financialDetails.data.pTrhdLType,
              loanAmount: financialDetails.data.pTrhdLocCost,
              loanTerm: financialDetails.data.pTrhdTerm,
              comment: form.getFieldValue('comment'),
              lastModifiedBy: userData.data.idx,
              createdBy: userData.data.idx,
              creationDate: moment().toISOString(),
            }
          }

          const processedFiles = [];

          for (const file of fileList) {
            let base64 
            // = file.preview
            // if(!base64){
              base64 = await fileToBase64Async(file.originFileObj);
            // }
        
            const processedFile = {
              stkIdx: customerData.data.cusIdx,
              cltIdx: customerData.data.cltIdx,
              centerIdx: customerData.data.centerIdx,
              appraisalIdx:
                customerData.data.appraisalId,
              imgMasterCategory: "APPROVAL_FLOW",
              imgSubCategory: selectedRole === 'CA' ? "CA_LEVEL" : "BM_LEVEL",
              imgOriginalName: file.name,
              imgContentType: file.type,
              image: base64,
            };
        
            processedFiles.push(processedFile);
          }

          const newData = {
            ...data,
            documents: processedFiles
          }
          
          if(isSecondMeeting){
            const save = await API.approvalServices.createScondMeetingStep(newData)
          }else{
            const save = await API.approvalServices.createStep(newData)
          }

          notification.success({
            message: 'Application Updated Successfully.'
          })
          if(selectedRole === 'BM'){
            return navigate('/indo-digital-loan/auth/applications/BM')
          }else{
            return navigate('/indo-digital-loan/auth/applications')
          }
        }
        catch(err){
          notification.error({
            message: 'Application update failed'
          })
        }
        finally{
          setAddingData('')
        }
      })
    }

    useEffect(() => {
      const BMStatus = approvalSteps.data?.secondMeetingApprovalStepDtoList?.
      find((row:any) => row.secondMeetingCurrentRole == "BM")?.secondMeetingStepStatus

      if(BMStatus === 'PENDING'){
        setIsSecondMeeting(true)
      }
    },[approvalSteps.data?.secondMeetingApprovalStepDtoList])
    
  return (
    <div>
      {
        (approvalSteps.data?.approvalStepDtoList?.find((row: any) => row?.stepAction === 'PENDING')?.roleCode === selectedRole)
        || (approvalSteps.data?.secondMeetingApprovalStepDtoList?.find((row: any) => row?.secondMeetingStepAction === 'PENDING')?.secondMeetingCurrentRole === selectedRole)?
          <>
            <Form
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 26 }}
              layout="vertical"
              // disabled={componentDisabled}
              // style={{ maxWidth: 600 }}
          >
            {
            roleWiseApproval.length ?
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
                      loading={addingData === type ? true: false}
                      disabled={
                        addingData? true
                        : false
                      } 
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
          </>
      : null
      } 
      <div className='mt-5'>
        <Title 
                level={5}
                title='Application History'
          /> 

        <div
          className='overflow-x-auto'
        >
          <Table
            className='w-4/4'
            showHeader={false}
            bordered={false}
            columns={columns}
            pagination={false}
            dataSource={
              approvalSteps.data?.approvalStepDtoList
              ? [
                  ...approvalSteps.data?.secondMeetingApprovalStepDtoList?.
                  filter((row:any) => row.secondMeetingCurrentRole == "BM")?.
                  map((row:any) => ({
                    ...row,
                    stepStatus: `SECOND MEETING - ${row.secondMeetingStepStatus}`,
                    roleDescription: row.secondMeetingCurrentRoleDesc
                  })),
                  ...approvalSteps.data?.approvalStepDtoList,
                ] 
              :[]}
          />
        </div>
      </div>
    </div>
  );
}
