/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { DatePicker, Input, Select, Space, theme } from 'antd';
import BreadCrumbContainer from '../../components/Containers/BreadCrumbContainer';
import Title from '../../components/Typography/Tytle';
import ContentContainer from '../../components/Containers/ContentContainer';
import { useSelector } from 'react-redux';
import { actions } from '../../store/store';
import moment from 'moment';
import ButtonContainer from '../../components/Buttons/Button';
import BPaginatedTable from '../../components/tables/BPaginatedTable';
import copyToClipborad from '../../utils/copyToClipBorad';
import { CopyOutlined } from '@ant-design/icons'

export interface IApplicationsProps {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Applications(_props: IApplicationsProps) {
  const navigate = useNavigate();
  const [searchStatus, setSearchStatus] = useState<string>('APPROVAL_PENDING')
  const [searchAppraisal, setSearchAppraisal] = useState<string | null>(null)
  const [fromDateFilter, setFromDateFilter] = useState(null);
  const [toDateFilter, setToDateFilter] = useState(null);
  const {
    token: { colorTextHeading },
  } = theme.useToken();
  const [searchedStatus, setSearchedStatus] = useState('APPROVAL_PENDING')

  const {
    applications
  } = useSelector((state: any) => state.Application)

  const {
    selectedRole,
    userData
  } = useSelector((state: any) => state.AppData)

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(7);

  useEffect(() => {
    if (searchAppraisal === null) {
      actions.getAllApplications({
        role: selectedRole,
        status: searchStatus,
        branch: userData?.data?.branches[0]?.code,
        page: currentPage,
        size: pageSize
      })
    }
    else if (searchAppraisal !== null) {
      actions.getAllApplications({
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
    actions.getAllApplications({
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

  const columns: ColumnsType<any> = [
    {
      title: 'Appraisal ID',
      dataIndex: 'idx',
      key: 'idx',
      render: (text) => {
        return <div className='flex justify-between'><span>{text}</span> <span onClick={() => copyToClipborad(text)}><CopyOutlined /></span></div>
      }
    },
    {
      title: 'Contract ID',
      dataIndex: 'contractNo',
      key: 'contractNo',
    },
    {
      title: 'Voucher No',
      dataIndex: 'voucherNo',
      key: 'voucherNo',
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
      key: 'fullName',
      dataIndex: 'fullName',
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/indo-digital-loan/auth/applications/viewApplication/${record.idx}`)}>View</a>
        </Space>
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


      <ContentContainer>
        <div className='mt-2'>
          <Title
            level={5}
            title='Appraisal Origination'
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
              },
              {
                value: 'RETURNED',
                label: 'Returned'
              },
              {
                value: 'APPROVED',
                label: 'Approved'
              },
              {
                value: 'REJECTED',
                label: 'Rejected'
              },
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
            size='middle'
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
            rowKey={'idx'}
            columns={columns.filter((column: any) => (
              searchedStatus !== 'APPROVED' && (
                column?.key == 'voucherNo' ||
                column?.key == 'contractNo'
              )) ? false : true
            )}
            dataSource={applications?.data?.content ?? []}
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
      </ContentContainer>
    </div>
  )
}
