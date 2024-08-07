/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { actions } from '../../../../store/store';
import { Input, Space, Tag, notification } from 'antd';
import Button from '../../../../components/Buttons/Button';
import { API } from '../../../../services/Services';
import formatAddress from '../../../../utils/getAddressByObjects';
import { CopyOutlined } from '@ant-design/icons'
import copyToClipborad from '../../../../utils/copyToClipBorad';
import BPaginatedTable from '../../../../components/tables/BPaginatedTable';
import FPaginatedTable from '../../../../components/tables/FPaginatedTable';
export interface IGroupUpdateProps {
  searchText: string | number
}

export default function GroupUpdate({
  searchText
}: IGroupUpdateProps) {

  const {
    slikRequestsGroupPaginatedData
  } = useSelector((state: any) => state.SlikRequest)
  const {
    innerSlikRequestsGroupPaginatedData
  } = useSelector((state: any) => state.SlikRequest)
  const userData = useSelector((state: any) => state.AppData.userData)
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [selectedRecord, setSelectedRecord] = useState<{ centerCode: string, groupCode: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)


  const columns: ColumnsType<any> = [
    {
      title: 'Center',
      dataIndex: 'centerCode',
      key: 'centerCode',
      render(_, record,) {
        return record.fusionCenterCode ?? record.centerCode
      },
    },
    {
      title: 'Group No',
      dataIndex: 'groupCode',
      key: 'groupCode',
    },
    {
      title: 'Branch',
      dataIndex: 'branchCode',
      key: 'branchCode',
    },
    {
      title: 'MFO Username',
      dataIndex: 'userIdx',
      key: 'userIdx',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record?.userIdx?.toLowerCase()?.includes(typeof (value) == 'string' ? value.toLowerCase() : value)
      }
    },
    {
      title: 'Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render(_, record) {
        return record.createdDate ? new Date(record.createdDate).toLocaleDateString() : '-'
      },
    },
    {
      title: 'Customer Count',
      dataIndex: 'cltCount',
      key: 'cltCount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() =>
            setSelectedRecord({ centerCode: record.centerCode, groupCode: record.groupCode })
          }>
            View</a>
        </Space>
      )
    }
  ];

  const columnsNew: ColumnsType<any> = [
    {
      title: 'Appraisal No',
      dataIndex: 'appraisalId',
      key: 'appraisalId',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record?.appraisalId?.toLowerCase()?.includes(typeof (value) == 'string' ? value.toLowerCase() : value)
      },
      render: (text) => {
        return <div className='w-56 sm:w-4/5 flex justify-between'><span>{text}</span> <span onClick={() => copyToClipborad(text)}><CopyOutlined /></span></div>
      }
    },
    {
      title: 'Centre',
      dataIndex: 'fusionCenterCode,',
      key: 'fusionCenterCode',
    },
    {
      title: 'Group No',
      dataIndex: 'groupIdx',
      key: 'groupIdx',
      render: (_value, record) => {
        if (record.groupIdx) {
          return record.groupIdx
        } else {
          return record.groupIdx
        }
      }
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (_value, record) => {
        if (record.customerName) {
          return record.customerName
        } else {
          return record.fullName
        }
      }
    },
    {
      title: 'NIK',
      dataIndex: 'customerKTP',
      key: 'customerKTP',
      render: (_value, record) => {
        if (record.customerKTP) {
          return record.customerKTP
        } else {
          return record.ktp
        }
      }
    },
    {
      title: 'Family C.NO',
      dataIndex: 'familyCard',
    },
    {
      title: 'Customer Type',
      dataIndex: 'clienteleType',
      key: 'clienteleType',
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
      title: 'Residential Address',
      dataIndex: 'address',
      key: 'address',
      render: (_value, record) => {
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
      render: (_, record) => {
        if (record.slikDto) {
          return <Input disabled={
            selectedRole === 'ADMIN' || (record.slikDto.clienteleType === 'SPOUSE' && record.slikDto.postCltFlag === 'N') ||
            (record.slikDto.clienteleType === 'GUARANTOR' && record.slikDto.postCltFlag === 'N')
          }
            onChange={(e) => {
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
            }}

          />
        } else {
          return <Input disabled={selectedRole === 'ADMIN' || record.cltType === 'S' || record.cltType === 'G'} onChange={(e) => {
            const newValue = e.target.value;

            setSelectedGroup((prev: any) => {
              const newData = prev.map((row: any) => {
                console.log('[row] - ', row)
                if (record.slkIdx === row.slkIdx) {
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
          }
          } />
        }
      }
    },
  ];

  const getGroupData = () => {
    actions.getSlikGroupWithPagination({
      userId: userData.data?.idx,
      branchCode: userData.data?.branches[0]?.code,
      status: 'P',
      page: searchText !== '' ? currentPage : currentPage,
      size: searchText !== '' ? pageSize : pageSize,
      appriasalId: searchText
    });

    if (searchText !== '') {
      setCurrentPage(1)
      setPageSize(7)
    }
  }

  useEffect(() => {
    getGroupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, searchText])

  const uploadData = async () => {
    try {
      setLoading(true)
      const _selectedGroup = selectedGroup
        ?.filter((row: any) => row.batchNumber)
        ?.map((row: any) => {
          return {
            ...row,
            batchNumber: row.batchNumber
          }
        })
      await API.slikServices.updateSlikBulck(_selectedGroup)
      notification.success({
        message: 'Batches Updated Successfully'
      })
      setSelectedGroup(null)
      getGroupData()
    }
    catch (err) {
      notification.error({
        message: 'Batches Not Updated Successfully'
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const getInnerGroupSlikData = () => {

    actions.getInnerSliksGroupWithPagination({
      userId: userData.data?.idx,
      branchCode: userData.data?.branches[0]?.code,
      status: 'P',
      type: 'GRPL',
      page: currentPage,
      size: pageSize,
      center: selectedRecord?.centerCode,
      group: selectedRecord?.groupCode
    });
  }

  useEffect(() => {
    getInnerGroupSlikData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecord])


  return (
    <div
      className='border-l-current border-r-current'
    >
      {selectedRecord === null ?

        <>
          <BPaginatedTable
            loading={slikRequestsGroupPaginatedData.fetching}
            rowKey={'centerCode'}
            columns={columns}
            dataSource={slikRequestsGroupPaginatedData?.data?.content ?? []}
            handlePaginationChange={handlePaginationChange}
            pagination={{
              total: slikRequestsGroupPaginatedData?.data?.totalElements,
              current: currentPage,
              pageSize: pageSize,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['7', '10', '15', '20', '50', '100'],
              showTotal: (total: number) =>
                <p className='text-gray-700'>Total {total} items</p>,
            }}
          />
        </>
        :
        <>
          <FPaginatedTable
            loading={innerSlikRequestsGroupPaginatedData.fetching}
            rowKey={'key'}
            columns={columnsNew}
            dataSource={innerSlikRequestsGroupPaginatedData?.data?.content ?? []}
            rowSelection={true}
          />

          <div className='flex justify-end py-10 w-full'>

            <Button
              className={'mr-2'}
              type='default'
              shape="round"
              size='middle'
              label='Back'
              onClick={() => setSelectedRecord(null)} />
            <Button
              onClick={uploadData}
              loading={loading}
              type='primary'
              shape="round"
              size='middle'
              disabled={selectedRole === 'ADMIN'}
              label='Update Batch'
            />
          </div>
        </>
      }
    </div>
  );
}
