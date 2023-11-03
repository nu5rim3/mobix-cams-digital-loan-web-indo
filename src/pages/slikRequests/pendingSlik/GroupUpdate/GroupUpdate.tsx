import React, {useEffect, useState} from 'react';
import FPaginatedTable from '../../../../components/tables/FPaginatedTable';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { actions } from '../../../../store/store';
import { Button, Input, Space, notification } from 'antd';
import { API } from '../../../../services/Services';

export interface IGroupUpdateProps {
  searchText: string
}

export default function GroupUpdate ({
  searchText
}: IGroupUpdateProps) {

  
  const {
    slikRequestsGroupData
  } = useSelector((state: any) => state.SlikRequest)
  const userData = useSelector((state: any) => state.AppData.userData)
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  
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
        title: 'MFO Username',
        dataIndex: 'customerName',
        key: 'customerName',
        filteredValue: [searchText],
        onFilter: (value, record) => {
          return record?.customerName?.toLowerCase()?.includes(typeof(value) == 'string'? value.toLowerCase(): value)
        }
      },
      {
        title: 'Date',
        dataIndex: 'creationDate',
        key: 'creationDate',
      },
      {
        title: 'Customer Count',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            {/* <a onClick={() => navigate(`/slikRequest/updateSlik/${record.idx}`)}> */}
            <a onClick={() => {
              console.log("recored", record)
              const select = slikRequestsGroupData.initialData.filter((row: any) => (row.center == record.center) && (row.groupIdx == record.groupIdx))
              console.log("oyoy", select)
              setSelectedGroup(select)
              }}>View</a>  
            {/* </a> */}
          </Space>
        ),
      },
    ];

    const columnsNew: ColumnsType<any> = [
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
        render: (text, record) => (
          <Input
            // value={text} // This value should be connected to your data
            onChange={(e) => {
              // Handle input changes here and update your data
              // e.target.value contains the new value of the input field
              console.log("recc**", record)
              const newValue = e.target.value;
              setSelectedGroup((prev: any) => {
                const newData = prev.map((row:any) => {
                  if(record.slkIdx == row.slkIdx){
                    console.log("in")
                    return {
                      ...row,
                      batchNumber : newValue
                    }
                  }else{
                    return row
                  }
                })
                console.log("meme", newData)
                return newData
              })
              // You can update the data array or state here
            }}
          />
        ),
      },
      // {
      //   title: 'Action',
      //   key: 'action',
      //   render: (_, record) => (
      //     <Space size="middle">
      //       {/* <a onClick={() => navigate(`/slikRequest/updateSlik/${record.idx}`)}>Update {record.name}</a> */}
      //     </Space>
      //   ),
      // },
    ];

  const getGroupData = () => {
      actions.getSlikByGroup({
        userId: userData.data?.idx,
        branchCode: 'TJP',//userData.data?.branches[0]?.code,
        status: 'P',
        type: 'GRPL'
      })
  }

    useEffect(() => {
        getGroupData()
    },[])

    const uploadData = async () => {
      try{
        setLoading(true)
        const response = await API.slikServices.updateSlikBulck(slikRequestsGroupData?.data?.filter((row:any) => row.batchNumber))
        notification.success({
            message: 'Batches Updated Successfully'
        })
        getGroupData()
      }
      catch(err){
  
      }finally{
        setLoading(false)
      }
    }

  return (
    <div
        className='border-l-current border-r-current'
    >
      {!selectedGroup
      ? <FPaginatedTable 
          loading={slikRequestsGroupData.fetching}
          rowKey={'idx'}
          columns={columns} 
          dataSource={slikRequestsGroupData.data|| []}
        />
      :
      <>
        <FPaginatedTable 
          loading={slikRequestsGroupData.fetching}
          rowKey={'centerCode'}
          columns={columnsNew} 
          dataSource={selectedGroup|| []}
        />

        <div className='flex justify-center p-10 w-full'>
            <Button 
              onClick={uploadData} 
              loading={loading}
              // htmlType="submit"
              type='primary'
              shape="round"
              size='large'
              // loading={addLoading}
            //   icon={<PlusOutlined/>}
            >
              Update Batch
            </Button>

        </div>
      </> 
      
      }
    </div>
  );
}
