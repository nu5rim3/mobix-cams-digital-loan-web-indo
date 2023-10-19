import * as React from 'react';
import Title from '../../../components/Typography/Tytle';
import Search from '../../../components/Search/Search';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FPaginatedTable from '../../../components/tables/FPaginatedTable';
import { actions } from '../../../store/store';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';


export interface INonPendingSlikProps {
}

export default function NonPendingSlik (props: INonPendingSlikProps) {

  const navigate = useNavigate();
  const columns: ColumnsType<any> = [
    {
      title: 'Center',
      dataIndex: 'centerCode',
      key: 'center',
      // filteredValue: [searchText],
      // onFilter: (value, record) => {
      //   return record.userName.toLowerCase().includes(typeof(value) == 'string'? value.toLowerCase(): value)
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
      title: 'Residential Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'BR Name and Relationship',
      dataIndex: 'BrName',
      key: 'BrName',
    },
    {
      title: 'Contact No',
      dataIndex: 'contactNo',
      key: 'contactNo',
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

  const [searchText, setSearchText] = useState<string>('')
  const {
    selectedStatus,
    slikRequestsData
  } = useSelector((state: any) => state.SlikRequest)
  const userData = useSelector((state: any) => state.AppData.userData)

  const getRequestData = () => {
    actions.getSlikRequests({
      userId: userData.data?.idx,
      branchCode: userData.data?.branches[0]?.code,
    })
  }

  useEffect(() => {
    getRequestData()
  },[selectedStatus])  

  return (
    <div>
        <Title 
          style={{margin: 1}} 
          level={5}
          title='Search Items'
        />
        <Search
          onChange={(value:any) => setSearchText(value)}
        />

        <div
         className='border-l-current border-r-current'
        >
          <FPaginatedTable 
            loading={slikRequestsData.fetching}
            rowKey={'idx'}
            columns={columns} 
            dataSource={
              selectedStatus === 'inprogress'
              ? slikRequestsData.data.filter((data:any) => data.status == "INPG")
              : slikRequestsData.data.filter((data:any) => data.status == "C") || []}
          />
        </div>
    </div>
  );
}
