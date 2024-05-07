import React, { useEffect, useState } from 'react';
import FPaginatedTable from '../../../../components/tables/FPaginatedTable';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { actions } from '../../../../store/store';
import { Button, Input, Space, notification } from 'antd';
import { API } from '../../../../services/Services';
import formatAddress from '../../../../utils/getAddressByObjects';

export interface IGroupUpdateProps {
  searchText: string
}

export default function GroupUpdate({
  searchText
}: IGroupUpdateProps) {


  const {
    slikRequestsGroupData
  } = useSelector((state: any) => state.SlikRequest)
  const userData = useSelector((state: any) => state.AppData.userData)
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)

  const columns: ColumnsType<any> = [
    {
      title: 'Centre',
      dataIndex: 'fusionCenterCode',
      key: 'fusionCenterCode',
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
      dataIndex: 'createdBy',
      key: 'createdBy',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record ?.createdBy ?.toLowerCase() ?.includes(typeof (value) == 'string' ? value.toLowerCase() : value)
        }
    },
    {
      title: 'Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
      sorter: (a, b) => a.lastModifiedDateMilliSecond - b.lastModifiedDateMilliSecond,
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
            const select = slikRequestsGroupData.initialData.filter((row: any) => (row.centerCode == record.centerCode) && (row.groupIdx == record.groupIdx))
            setSelectedGroup(select)
          }}>View</a>
          {/* </a> */}
        </Space>
      ),
    },
  ];

  const columnsNew: ColumnsType<any> = [
    {
      title: 'Centre',
      dataIndex: 'fusionCenterCode,',
      key: 'fusionCenterCode',
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
      key: 'customerKTP',
    },
    {
      title: 'Family C.NO',
      dataIndex: 'familyCard',
      key: 'familyCard',
    },
    {
      title: 'Customer Type',
      dataIndex: 'clienteleType',
      key: 'clienteleType'
    },
    {
      title: 'Residential Address',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => {
        return formatAddress({
          address1: record.addLine1,
          address2: record.addLine2,
          address3: record.addLine3
        })
      }
    },
    {
      title: 'BR Name',
      dataIndex: 'brName',
      key: 'brName',
    },
    {
      title: 'Contact No',
      dataIndex: 'cltContact1',
      key: 'cltContact1',
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      render: (text, record) => (
        <Input
          // value={text} // This value should be connected to your data
          disabled={selectedRole === 'ADMIN' || record.slikDto.clienteleType == 'SPOUSE'
            || record.slikDto.clienteleType == 'GUARANTOR' && (record.slikDto.postCltFlag != null && record.slikDto.postCltFlag == 'N')}
          onChange={(e) => {
            // Handle input changes here and update your data
            // e.target.value contains the new value of the input field
            const newValue = e.target.value;
            setSelectedGroup((prev: any) => {
              const newData = prev.map((row: any) => {
                if (record.slkIdx == row.slkIdx) {
                  return {
                    ...row,
                    batchNumber: newValue
                  }
                } else {
                  return row
                }
              })
              return newData
            })
            // You can update the data array or state here
          }}
        />
      ),
    },
  ];

  const getGroupData = () => {
    actions.getSlikByGroup({
      userId: userData.data ?.idx,
      branchCode: userData.data ?.branches[0] ?.code, //'TJP',
      status: 'P',
      type: 'GRPL'
    })
  }

  useEffect(() => {
    getGroupData()
  }, [])

  const uploadData = async () => {
    try {
      setLoading(true)
      const response = await API.slikServices.updateSlikBulck(selectedGroup
        ?.filter((row: any) => row.batchNumber)
          ?.map((row: any) => {
            return {
              ...row.slikDto,
              batchNumber: row.batchNumber
            }
          })
          )
      notification.success({
        message: 'Batches Updated Successfully'
      })
      setSelectedGroup(null)
      getGroupData()
    }
    catch (err) {

    } finally {
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
          rowKey={'slkIdx'}
          columns={columns}
          dataSource={slikRequestsGroupData.data || []}
        />
        :
      <>
        <FPaginatedTable
          loading={slikRequestsGroupData.fetching}
          rowKey={'key'}
          columns={columnsNew}
          dataSource={selectedGroup || []}
        />

        <div className='flex justify-center p-10 w-full'>
          <Button
            onClick={uploadData}
            loading={loading}
            // htmlType="submit"
            type='primary'
            shape="round"
            size='large'
            disabled={selectedRole === 'ADMIN'}
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
