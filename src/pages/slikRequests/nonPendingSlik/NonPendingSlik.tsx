import * as React from 'react';
import Title from '../../../components/Typography/Tytle';
import Search from '../../../components/Search/Search';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FPaginatedTable from '../../../components/tables/FPaginatedTable';
import { actions } from '../../../store/store';
import { Input, Select, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import ButtonContainer from '../../../components/Buttons/Button';
import { act } from 'react-dom/test-utils';
import { API } from '../../../services/Services';


export interface INonPendingSlikProps {
}

export default function NonPendingSlik (props: INonPendingSlikProps) {
  
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('')
  const [searchBranch, setSearchBrach] = useState<string>('')
  const [branch, setBranch] = useState([])

  
  const {
    selectedStatus,
    slikRequestsData,
    selectedBranch
  } = useSelector((state: any) => state.SlikRequest)
  const {
    userData,
    selectedRole
  } = useSelector((state: any) => state.AppData)
  
  const columnsInProgress: ColumnsType<any> = [
    {
      title: 'Center',
      dataIndex: 'fusionCenterCode',
      key: 'fusionCenterCode',
      filteredValue: [searchText],
      // onFilter: (value, record) => {
      //   return record?.centerCode?.toLowerCase()?.includes(typeof(value) == 'string'? value.toLowerCase(): value)
      // }
    },
    {
      title: 'Group No',
      dataIndex: 'groupIdx',
      key: 'groupIdx',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record?.customerName?.toLowerCase()?.includes(typeof(value) == 'string'? value.toLowerCase(): value)
      }
    },
    {
      title: 'NIK',
      dataIndex: 'customerKTP',
      key: 'customecustomerKTPrName',
    },
    {
      title: 'Family C.NO',
      dataIndex: 'clienteleIdx',
      key: 'clienteleIdx',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      render: (_, record) => (
        <Space size="middle">
          {
            userData.data?.branches.find((branch:any) => {
              return branch.code == selectedBranch
            })?.description || userData.data?.branches[0]?.description
          }
        </Space>
      )
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/slikRequest/updateSlik/${record.slkIdx}`)}>Update {record.name}</a>
        </Space>
      ),
    },
  ];
  const columnsCompleted: ColumnsType<any> = [
    {
      title: 'Center',
      dataIndex: 'fusionCenterCode',
      key: 'fusionCenterCode',
      filteredValue: [searchText],
      // onFilter: (value, record) => {
      //   return record?.centerCode?.toLowerCase()?.includes(typeof(value) == 'string'? value.toLowerCase(): value)
      // }
    },
    {
      title: 'Group No',
      dataIndex: 'groupIdx',
      key: 'groupIdx',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record?.customerName?.toLowerCase()?.includes(typeof(value) == 'string'? value.toLowerCase(): value)
      }
    },
    {
      title: 'NIK',
      dataIndex: 'customerKTP',
      key: 'customecustomerKTPrName',
    },
    {
      title: 'Family C.NO',
      dataIndex: 'clienteleIdx',
      key: 'clienteleIdx',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      render: (_, record) => (
        <Space size="middle">
          {
            userData.data?.branches.find((branch:any) => {
              return branch.code == selectedBranch
            })?.description || userData.data?.branches[0]?.description
          }
        </Space>
      )
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
    },
  ];

  const getRequestData = () => {
    if(!(selectedRole == 'ADMIN' || selectedRole == 'SLIKU')){
      return actions.getSlikRequests({
        userId: userData.data?.idx,
        branchCode: userData.data?.branches[0]?.code,
      })
    }else if(selectedBranch){
      return actions.getSlikRequests({
        userId: userData.data?.idx,
        branchCode: selectedBranch,
      })
    }
  }

  const getBranchData = async () => {
    const branches = await API.branchServices.getAllBranches()
    setBranch(branches.data)
  }

  useEffect(() => {
    getRequestData()
    getBranchData()
  },[selectedStatus])  

  return (
    <div>
        <Title 
          style={{margin: 1}} 
          level={5}
          title='Search Items'
        />

      <div className='flex mt-1 mb-3 items-center '>
        <Search
          onChange={(value:any) => setSearchText(value)}
          className={'pb-0'}
        />
        {(selectedRole == 'ADMIN' || selectedRole == 'SLIKU')?
          <>
          <Select
              className='ml-2 '
              size={'large'}
              // allowClear
              onChange={(value) => {
                // setSearchBrach(value)
                actions.SRSetBranch(value)
              }}
              showSearch
              value={selectedBranch}
              style={{ width: 200 }}
              placeholder='Select A Branch'
              options={
                branch.length?
                branch?.map((branch:any) =>{
                  return ({
                    value: branch.code,
                    label: branch.description
                  })
                })
                : []
            }
          />
          <ButtonContainer 
            type='primary' 
            label='Search' 
            size='large' 
            className='ml-3'
            onClick={() => {
              getRequestData()
          }}/>
          </>
        : null}
      </div>

        <div
         className='border-l-current border-r-current'
        >
          <FPaginatedTable 
            loading={slikRequestsData.fetching}
            rowKey={'slkIdx'}
            columns={selectedStatus === 'inprogress'? columnsInProgress : columnsCompleted} 
            dataSource={
              selectedStatus === 'inprogress'
              ? slikRequestsData.data.filter((data:any) => data.status == "INPG")
              : slikRequestsData.data.filter((data:any) => data.status == "C") || []}
          />
        </div>
    </div>
  );
}
