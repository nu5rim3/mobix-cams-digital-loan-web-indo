/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Title from '../../../components/Typography/Tytle';
import Search from '../../../components/Search/Search';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FPaginatedTable from '../../../components/tables/FPaginatedTable';
import { actions } from '../../../store/store';
import { Input, Select, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import ButtonContainer from '../../../components/Buttons/Button';
import { act } from 'react-dom/test-utils';
import { API } from '../../../services/Services';
import { JsonToExcel } from "react-json-to-excel";
import BPaginatedTable from '../../../components/tables/BPaginatedTable';

export interface INonPendingSlikProps {
}

export default function NonPendingSlik(props: INonPendingSlikProps) {

  const {
    slikRequestsPaginatedData
  } = useSelector((state: any) => state.SlikRequest)

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('')
  const [branch, setBranch] = useState<any[]>([])
  const [showBranch, setShowBranch] = useState()
  const [inProgressData, setInProgressData] = useState<any[]>([]);
  const [completedData, setCompletedData] = useState<any[]>([]);
  const {
    selectedStatus,
    slikRequestsData,
    selectedBranch

  } = useSelector((state: any) => state.SlikRequest)
  const {
    userData,
    selectedRole
  } = useSelector((state: any) => state.AppData)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const columnsInProgress: ColumnsType<any> = [
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
      dataIndex: 'groupIdx',
      key: 'groupIdx',
      render(_value, record) {
        return record?.groupIdx || "-"
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
      dataIndex: 'groupIdx',
      key: 'groupIdx',
      render(_value, record) {
        return record?.groupIdx || "-"
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
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        // console.log('[record] - ', record)
        return (
          <Space size="middle">
            <a onClick={() => navigate(`/indo-digital-loan/auth/slikRequest/viewSlik/${record.slikIdx}`)}>View {record.name}</a>
          </Space>
        )
      }
    },
  ];

  const getIndividualData = () => {
    actions.getSliksWithPagination({
      userId: '',
      branchCode: userData.data?.branches[0]?.code,
      status: selectedStatus === 'inprogress' ? 'INPG' : 'C',
      type: "",
      page: searchText !== '' ? currentPage : currentPage,
      size: searchText !== '' ? pageSize : pageSize,
      appriasalId: searchText
    })

    if (searchText !== '') {
      setCurrentPage(1)
      setPageSize(7)
    }
  }

  const getRequestData = () => {
    if (!(selectedRole == 'ADMIN' || selectedRole == 'SLIKU')) {
      return actions.getSlikRequests({
        userId: userData.data?.idx,
        branchCode: userData.data?.branches[0]?.code,
      })
    } else if (selectedBranch) {
      setShowBranch(branch.find((branch: any) => {
        return branch.code == selectedBranch
      })?.description || userData.data?.branches[0]?.description)
      return actions.getSlikRequests({
        userId: userData.data?.idx,
        branchCode: selectedBranch,
      })
    }
  }

  useEffect(() => {
    getIndividualData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, pageSize, currentPage, searchText])


  useEffect(() => {
    setPageSize(7);
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus])


  // console.log('[slikRequestsPaginatedData] - ', slikRequestsPaginatedData?.data?.content);

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  return (
    <div>
      {/* <Title
        style={{ margin: 1 }}
        level={5}
        title='Search Items ----'
      /> */}

      <div className='flex mt-2 items-center '>
        {/* {(selectedRole == 'ADMIN' || selectedRole == 'SLIKU') ?
          <>
            <Select
              className='mr-2 '
              size={'large'}
              allowClear
              onChange={(value) => {
                actions.SRSetBranch(value)
              }}
              showSearch
              value={selectedBranch}
              style={{ width: 200 }}
              placeholder='Select A Branch'
              filterOption={(input, option) => (option?.label?.toLowerCase() ?? '').includes(input)}
              options={
                branch.length ?
                  branch?.map((branch: any) => {
                    return ({
                      value: branch.code,
                      label: branch.description,
                    })
                  })
                  : []
              }
            />
          </>
          : null} */}
        <Search
          onChange={(value: any) => setSearchText(value)}
        // className={'pb-0'}
        />
        {(selectedRole == 'ADMIN' || selectedRole == 'SLIKU') ?
          <>
            {/* <ButtonContainer
              disabled={!selectedBranch}
              type='primary'
              label='Search'
              size='middle'
              className='ml-3'
              onClick={() => {
                // getRequestData()
              }} /> */}
            {/* <JsonToExcel
            title="Download Excel"
            data={selectedStatus === 'inprogress' ? getDataForExcel(slikRequestsData.data.filter((data: any) => data.status == "INPG")) : getDataForExcel(slikRequestsData.data.filter((data: any) => data.status == "C" || data.status == "A"))}
            fileName="sample-file"
            btnClassName=" ant-btn css-dev-only-do-not-override-c5cmmx ant-btn-primary ant-btn-lg ml-3"
          /> */}
          </>
          : null}
      </div>

      <div
        className='border-l-current border-r-current'
      >
        <BPaginatedTable
          loading={slikRequestsPaginatedData.fetching}
          rowKey={'slikIdx'}
          columns={selectedStatus === 'inprogress' ? columnsInProgress : columnsCompleted}
          dataSource={slikRequestsPaginatedData?.data?.content.filter((item: any) => item.fusionCenterCode !== null) ?? []}
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
        // selectedStatus === 'inprogress'
        //   ? slikRequestsData.data.filter((data: any) => data.status == "INPG")
        //   : slikRequestsData.data.filter((data: any) => data.status == "C" || data.status == "A") || []}
        />
      </div>
    </div>
  );
}
