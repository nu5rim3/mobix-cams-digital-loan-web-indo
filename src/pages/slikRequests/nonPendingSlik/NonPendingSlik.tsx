/* eslint-disable @typescript-eslint/no-explicit-any */
import Search from '../../../components/Search/Search';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../../store/store';
import { Select, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import BPaginatedTable from '../../../components/tables/BPaginatedTable';

export interface INonPendingSlikProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NonPendingSlik(_props: INonPendingSlikProps) {

  const {
    slikRequestsPaginatedData
  } = useSelector((state: any) => state.SlikRequest)

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('')


  const {
    selectedStatus,
  } = useSelector((state: any) => state.SlikRequest)
  const {
    userData,
  } = useSelector((state: any) => state.AppData)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [searchStatus, setSearchStatus] = useState('')

  const columnsInProgress: ColumnsType<any> = [
    {
      title: 'Loan Type',
      dataIndex: 'appraisalType',
      key: 'appraisalType',
      align: 'center',
      render: (text) => {
        switch (text) {
          case "IL":
            return <Tag className='rounded-full' color='green'>Individual</Tag>;
          case "GRPL":
            return <Tag className='rounded-full' color='blue'>Group</Tag>;
          default:
            return "NONE";
        }
      }
    },
    {
      title: 'Center',
      dataIndex: 'fusionCenterCode',
      key: 'fusionCenterCode',
      filteredValue: [searchText],
      render(_value, record) {
        return record?.fusionCenterCode || record?.centerCode || "-"
      },
    },
    {
      title: 'Group No',
      dataIndex: 'groupCode',
      key: 'groupCode',
      render(_value, record) {
        return record?.groupCode || "-"
      },
    },
    {
      title: 'Customer Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'NIK',
      dataIndex: 'ktp',
      key: 'ktp',
    },
    {
      title: 'Customer Type',
      dataIndex: 'cltType',
      key: 'cltType',
      align: 'center',
      render: (text) => {
        switch (text) {
          case "C":
            return <Tag className='rounded-full' color='blue'>Customer</Tag>;
          case "G":
            return <Tag className='rounded-full' color='cyan'>Guarantor</Tag>;
          case "S":
            return <Tag className='rounded-full' color='gold'>Spouse</Tag>
          default:
            return "NONE";
        }
      },
    },
    {
      title: 'Family C.NO',
      dataIndex: 'familyCard',
      key: 'familyCard',
    },
    {
      title: 'Branch',
      dataIndex: 'branchDesc',
      key: 'branchDesc',
      render(_value, record) {
        return <p className="capitalize">{record?.branchDesc}</p> || "-"
      },
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      render(_value, record) {
        return record?.batchNumber || "-"
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        // console.log('[record] - ', record)
        return (
          <Space size="middle">
            <a onClick={() => navigate(`/indo-digital-loan/auth/slikRequest/updateSlik/${record.slikIdx}`)}>Update</a>
          </Space>
        )
      }
    },
  ];
  const columnsCompleted: ColumnsType<any> = [
    {
      title: 'Loan Type',
      dataIndex: 'appraisalType',
      key: 'appraisalType',
      align: 'center',
      render: (text) => {
        switch (text) {
          case "IL":
            return <Tag className='rounded-full' color='green'>Individual</Tag>;
          case "GRPL":
            return <Tag className='rounded-full' color='blue'>Group</Tag>;
          default:
            return "NONE";
        }
      }
    },
    {
      title: 'Center',
      dataIndex: 'fusionCenterCode',
      key: 'fusionCenterCode',
      filteredValue: [searchText],
      render(_value, record) {
        return record?.fusionCenterCode || record?.centerCode || "-"
      },
    },
    {
      title: 'Group No',
      dataIndex: 'groupCode',
      key: 'groupCode',
      render(_value, record) {
        return record?.groupCode || "-"
      },
    },
    {
      title: 'Customer Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'NIK',
      dataIndex: 'ktp',
      key: 'ktp',
    },
    {
      title: 'Customer Type',
      dataIndex: 'cltType',
      key: 'cltType',
      align: 'center',
      render: (text) => {
        switch (text) {
          case "C":
            return <Tag className='rounded-full' color='blue'>Customer</Tag>;
          case "G":
            return <Tag className='rounded-full' color='cyan'>Guarantor</Tag>;
          case "S":
            return <Tag className='rounded-full' color='gold'>Spouse</Tag>
          default:
            return "NONE";
        }
      },
    },
    {
      title: 'Family C.NO',
      dataIndex: 'familyCard',
      key: 'familyCard',
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      render(_value, record) {
        return record?.batchNumber || "-"
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <a onClick={() => navigate(`/indo-digital-loan/auth/slikRequest/viewSlik/${record.slikIdx}`)}>View {record.name}</a>
          </Space>
        )
      }
    },
  ];

  useEffect(() => {
    if (searchText === '') {
      actions.getSliksWithPagination({
        userId: '',
        branchCode: userData.data?.branches[0]?.code,
        status: selectedStatus === 'inprogress' ? 'INPG' : 'C',
        type: "",
        batchNo: searchStatus === 'batch' ? searchText : '',
        identificationNo: searchStatus === 'nik' ? searchText : '',
        customerName: searchStatus === 'customer' ? searchText : '',
        center: searchStatus === 'center' ? searchText : '',
        group: searchStatus === 'group' ? searchText : '',
        page: searchText !== '' ? currentPage : currentPage,
        size: searchText !== '' ? pageSize : pageSize,
      })
    } else if (searchText !== '') {
      actions.getSliksWithPagination({
        userId: '',
        branchCode: userData.data?.branches[0]?.code,
        status: selectedStatus === 'inprogress' ? 'INPG' : 'C',
        type: "",
        batchNo: searchStatus === 'batch' ? searchText : '',
        identificationNo: searchStatus === 'nik' ? searchText : '',
        customerName: searchStatus === 'customer' ? searchText : '',
        center: searchStatus === 'center' ? searchText : '',
        group: searchStatus === 'group' ? searchText : '',
        page: searchText !== '' ? currentPage : currentPage,
        size: searchText !== '' ? pageSize : pageSize,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, pageSize, currentPage, searchText])


  useEffect(() => {
    setPageSize(7);
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus])

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  return (
    <div>
      <div className='flex my-2 items-center '>
        <Select
          className='mr-2'
          size={'middle'}
          allowClear
          onChange={(e) => {
            setSearchStatus(e)
          }}
          style={{ width: 200 }}
          defaultValue='center'
          placeholder='Select A Type'
          options={[
            {
              value: 'center',
              label: 'Center No'
            },
            {
              value: 'group',
              label: 'Group No'
            },
            {
              value: 'customer',
              label: 'Customer Name'
            },
            {
              value: 'nik',
              label: 'NIK'
            },
            {
              value: 'batch',
              label: 'Batch No'
            }
          ]}
        />
        <Search
          onChange={(value: any) => setSearchText(value)}
          className={'w-full sm:w-1/3 pb-0'}
        />
      </div>

      <div
        className='border-l-current border-r-current'
      >
        <BPaginatedTable
          loading={slikRequestsPaginatedData.fetching}
          rowKey={'slikIdx'}
          columns={selectedStatus === 'inprogress' ? columnsInProgress : columnsCompleted}
          dataSource={slikRequestsPaginatedData?.data?.content ?? []}
          handlePaginationChange={handlePaginationChange}
          pagination={{
            total: slikRequestsPaginatedData?.data?.totalElements,
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
    </div>
  );
}
