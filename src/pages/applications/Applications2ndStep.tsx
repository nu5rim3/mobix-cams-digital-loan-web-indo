/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../services/Services';
import { ColumnsType } from 'antd/es/table';
import { DatePicker, Input, Modal, Select, Space, Tag, notification, theme } from 'antd';
import BreadCrumbContainer from '../../components/Containers/BreadCrumbContainer';
import Title from '../../components/Typography/Tytle';
import ContentContainer from '../../components/Containers/ContentContainer';
import { useSelector } from 'react-redux';
import { actions } from '../../store/store';
import moment from 'moment';
import ButtonContainer from '../../components/Buttons/Button';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { genarateStepStatus } from '../../utils/setpsGenaration';
import BPaginatedTable from '../../components/tables/BPaginatedTable';
import copyToClipborad from '../../utils/copyToClipBorad';
import { CopyOutlined } from '@ant-design/icons'

export interface IApplicationsProps {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Applications2ndStep(_props: IApplicationsProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [searchStatus, setSearchStatus] = useState<string>('APPROVAL_PENDING')
  const [searchAppraisal, setSearchAppraisal] = useState<string | null>(null)
  const [fromDateFilter, setFromDateFilter] = useState(null);
  const [toDateFilter, setToDateFilter] = useState(null);
  const [searchedStatus, setSearchedStatus] = useState('APPROVAL_PENDING')
  const {
    token: { colorTextHeading },
  } = theme.useToken();

  const {
    applications
  } = useSelector((state: any) => state.Application)

  const {
    selectedRole,
    userData
  } = useSelector((state: any) => state.AppData)

  useEffect(() => {
    if (searchAppraisal === null) {
      actions.getSecondMeetingAppraisals({
        role: selectedRole,
        status: searchStatus,
        branch: userData?.data?.branches[0]?.code,
        page: currentPage - 1,
        size: pageSize
      })
    } else if (searchAppraisal !== null) {
      actions.getSecondMeetingAppraisals({
        role: selectedRole,
        appraisalId: searchAppraisal,
        fromDate: fromDateFilter,
        toDate: toDateFilter,
        status: searchStatus,
        branch: userData?.data?.branches[0]?.code,
        page: currentPage - 1,
        size: pageSize
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, searchStatus, searchAppraisal, toDateFilter, fromDateFilter])

  const { confirm } = Modal;

  const handleFromDateFilterChange = (date: any) => {
    if (date) {
      setFromDateFilter(date.format('YYYY-MM-DD'));
    } else {
      setFromDateFilter(null);
    }
  };

  const handleToDateFilterChange = (date: any) => {
    if (date) {
      setToDateFilter(date.format('YYYY-MM-DD'));
    } else {
      setToDateFilter(null)
    }
  };

  const searchData = () => {
    setSearchedStatus(searchStatus)
    actions.getSecondMeetingAppraisals({
      role: selectedRole,
      appraisalId: searchAppraisal,
      fromDate: fromDateFilter,
      toDate: toDateFilter,
      status: searchStatus,
      branch: userData?.data?.branches[0]?.code,
      page: currentPage - 1,
      size: pageSize
    })
  }

  const genarateStepA = (type: string) => {
    if (type == 'Return') {
      return 'RETURNED'
    }
    if (type == 'Reject') {
      return 'REJECTED'
    }
    if (type == 'Approve') {
      return 'APPROVED'
    }
  }

  const showPromiseConfirm = (type: string, record: any) => {
    confirm({
      title: 'Second Meeting Confirmation',
      icon: <ExclamationCircleFilled />,
      content: `Do you confirm and ${type} second meeting of this customer ?`,
      onOk: async () => {
        //return new Promise(async (resolve, reject) => {
        try {
          const data = {
            appraisalIdx: record.idx,
            secondMeetingStepAction: genarateStepA(type),
            secondMeetingStepStatus: genarateStepStatus(type, selectedRole),
            appraisalType: record.appraisalType,
            loanProduct: record.loanProduct,
            loanAmount: record.loanAmount,
            loanTerm: record.loanTerm,
            documents: []
          }

          await API.approvalServices.createScondMeetingStep(data)

          notification.success({
            message: 'Application Updated Successfully.'
          })

          searchData()

          return true
        }
        catch {
          return false
        }
      },
      onCancel() { },
      okText: 'Yes '
    })
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Appraisal ID',
      dataIndex: 'idx',
      key: 'idx',
      render: (_, { status, idx }) => {
        switch (status) {
          case "P":
            return <div className='flex justify-between'><Tag color='orange' key={status}>{idx}</Tag><CopyOutlined onClick={() => copyToClipborad(idx)} /></div>;
          case "R":
            return <div className='flex justify-between'><Tag color='cyan' key={status}>{idx}</Tag><CopyOutlined onClick={() => copyToClipborad(idx)} /></div>;
          case "J":
            return <div className='flex justify-between'><Tag color='red' key={status}>{idx}</Tag><CopyOutlined onClick={() => copyToClipborad(idx)} /></div>;
          case "C":
            return <div className='flex justify-between'><Tag color='green' key={status}>{idx}</Tag><CopyOutlined onClick={() => copyToClipborad(idx)} /></div>;
          case "AP":
            return <div className='flex justify-between'><Tag color='blue' key={status}>{idx}</Tag><CopyOutlined onClick={() => copyToClipborad(idx)} /></div>;
          default:
            return <div className='flex justify-between'><Tag color='' key={status}>{idx}</Tag><CopyOutlined onClick={() => copyToClipborad(idx)} /></div>;
        }
      }
    },
    {
      title: 'Contract ID',
      dataIndex: 'contractNo',
      key: 'contractNo',
    },
    {
      title: 'Product Name',
      dataIndex: 'loanProduct',
      key: 'loanProduct',
    },
    {
      title: 'Customer NIK',
      dataIndex: 'identificationNo',
      key: 'identificationNo',
      render: (_, record) => record.identificationNo || '-'
    },
    {
      title: 'Customer Name',
      key: 'tags',
      render: (_, record) => record.fullName || '-'
    },
    {
      title: 'Modified At',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      render: (value) => moment(value).format('YYYY-MM-DD')
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Branch Name',
      dataIndex: 'branchDesc',
      key: 'branchDesc',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className='flex justify-between'>
          <Space size="middle" className='mr-3'>
            <a onClick={() => navigate(`/indo-digital-loan/auth/applications/viewApplication/${record.idx}`)}>View</a>
          </Space>
          {
            searchedStatus != 'APPROVAL_PENDING'
              ? null
              :
              <>

                <Space size="middle" className='mr-3' >
                  <a hidden={selectedRole != 'BM'} onClick={() => showPromiseConfirm('Approve', record)}>| Approve</a>
                </Space>

                <Space size="middle" className='mr-3'>
                  <a hidden={selectedRole != 'BM'} onClick={() => showPromiseConfirm('Reject', record)}>| Reject</a>
                </Space>
              </>
          }
        </div>
      ),
    },
  ];

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  return (
    <div>
      <BreadCrumbContainer>

        <Title
          level={4}
          title='Application Approval'
        />
      </BreadCrumbContainer>

      <ContentContainer >
        <div className='mt-2'>
          <Title
            style={{ color: '#374957' }}
            level={5}
            title='Second Meeting Pending'
          />
        </div>

        <div className='flex mt-1 mb-3 items-center'>
          <Select
            className='mr-2'
            size={'middle'}
            allowClear
            onChange={(value) => {
              setSearchStatus(value)
            }}
            style={{ width: 200 }}
            defaultValue='APPROVAL_PENDING'
            placeholder='Select A Status'
            options={[
              {
                value: 'APPROVAL_PENDING',
                label: 'Approval Pending'
              }
            ]}
          />
          <Input
            size={'middle'}
            placeholder='Appraisal ID'
            className='mr-2 w-2/6'
            allowClear
            onChange={(e) => setSearchAppraisal(e.target.value)}
          />
          <DatePicker size={'middle'} onChange={handleFromDateFilterChange} />
          <div className='m-2 font-bold' style={{ color: colorTextHeading }}>
            To
          </div>
          <DatePicker size={'middle'} onChange={handleToDateFilterChange} />
          <ButtonContainer
            type='primary'
            label='Search'
            size={'middle'}
            className='ml-3'
            onClick={() => {
              searchData()
            }} />
        </div>

        <div
          className='border-l-current border-r-current'
        >
          <BPaginatedTable
            loading={applications.fetching}
            // loading={false}
            rowKey={'idx'}
            columns={columns.filter((column: any) => (searchedStatus !== 'APPROVED' && column?.key == 'contractNo') ? false : true)}
            dataSource={applications?.data?.content || []}
            handlePaginationChange={handlePaginationChange}
            pagination={{
              total: applications?.data?.totalElements,
              current: currentPage,
              pageSize: pageSize,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['7', '10', '15', '20', '50', '100'],
              showTotal: (total: number) =>
                <p className='text-gray-700'>Total {total} items</p>,
            }}
          />
        </div>

        {/* <div className='flex justify-center p-10'>
          <Button 
            onClick={() => {
              navigate('/userManagement/createUser')
            }} 
            type='primary'
            shape="round"
            size='large'
            icon={<PlusOutlined/>}
            label="Create New User"
          />
        </div> */}
      </ContentContainer>
    </div>
  )
}
