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


  useEffect(() => {
    if (innerSlikRequestsGroupPaginatedData?.data?.content) {
      setSelectedGroup(innerSlikRequestsGroupPaginatedData?.data?.content)
    }
  }, [innerSlikRequestsGroupPaginatedData])



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
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      render(_, record) {
        return record.lastModifiedDate ? new Date(record.lastModifiedDate).toLocaleDateString() : '-'
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
      render: (_, { status, appraisalId }) => {
        switch (status) {
          case "P":
            return <div className='flex justify-between'><Tag color='orange' key={status}>{appraisalId}</Tag><CopyOutlined onClick={() => copyToClipborad(appraisalId)} /></div>;
          case "R":
            return <div className='flex justify-between'><Tag color='cyan' key={status}>{appraisalId}</Tag><CopyOutlined onClick={() => copyToClipborad(appraisalId)} /></div>;
          case "J":
            return <div className='flex justify-between'><Tag color='red' key={status}>{appraisalId}</Tag><CopyOutlined onClick={() => copyToClipborad(appraisalId)} /></div>;
          case "C":
            return <div className='flex justify-between'><Tag color='green' key={status}>{appraisalId}</Tag><CopyOutlined onClick={() => copyToClipborad(appraisalId)} /></div>;
          case "AP":
            return <div className='flex justify-between'><Tag color='blue' key={status}>{appraisalId}</Tag><CopyOutlined onClick={() => copyToClipborad(appraisalId)} /></div>;
          default:
            return <div className='flex justify-between'><Tag color='' key={status}>{appraisalId}</Tag><CopyOutlined onClick={() => copyToClipborad(appraisalId)} /></div>;
        }
      }
    },
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
      render: (_value, record) =>
        record.brName ?? "-"
    },
    {
      title: 'Contact No',
      dataIndex: 'cltContact1',
      key: 'cltContact1',
      render: (_value, record) => {
        if (record.cltContact1) {
          return record.cltContact1
        } else {
          return record.cusContact1
        }
      }
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      render: (_, record) => {
        if (record.slikDto) {
          return <Input disabled={
            selectedRole === 'ADMIN' || (record.slikDto.clienteleType === 'S' && record.slikDto.postCltFlag === 'N') ||
            (record.slikDto.clienteleType === 'G' && record.slikDto.postCltFlag === 'N')
          }
            onChange={(e) => {
              const newValue = e.target.value;

              setSelectedGroup((prev: any) => {
                const newData = prev.map((row: any) => {
                  if (record.slikIdx == row.slikIdx) {
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
          return <Input disabled={selectedRole === 'ADMIN' || (record.cltType === 'S' && record.postCltFlag === 'N') || (record.cltType === 'G' && record.postCltFlag === 'N')} onChange={(e) => {
            const newValue = e.target.value;

            setSelectedGroup((prev: any) => {
              const newData = prev.map((row: any) => {
                if (record.slikIdx == row.slikIdx) {
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
      role: selectedRole,
      status: 'P',
      page: searchText !== '' ? currentPage : currentPage,
      size: searchText !== '' ? pageSize : pageSize,
      appriasalId: '',
      center: searchText !== '' ? searchText : '',
      group: ''
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
    if (selectedRecord !== null) {
      getInnerGroupSlikData();
    }
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
            rowKey={'appraisalIds'}
            columns={columnsNew}
            dataSource={selectedGroup ?? []}
            rowSelection={true}
          />

          <div className='flex justify-end py-10 w-full'>

            <Button
              className={'mr-2'}
              type='default'
              shape="round"
              size='middle'
              label='Back'
              onClick={() => {
                setSelectedRecord(null)
                setSelectedGroup(null)
              }} />
            <Button
              onClick={() => uploadData()}
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
