/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { actions } from '../../../../store/store';
import { Input, Space, notification } from 'antd';
import Button from '../../../../components/Buttons/Button';
import { API } from '../../../../services/Services';
import formatAddress from '../../../../utils/getAddressByObjects';
import { exportToExcel } from "react-json-to-excel";
import { CopyOutlined } from '@ant-design/icons'
import copyToClipborad from '../../../../utils/copyToClipBorad';
import BPaginatedTable from '../../../../components/tables/BPaginatedTable';
import { useNavigate } from 'react-router-dom';
import FPaginatedTable from '../../../../components/tables/FPaginatedTable';
export interface IGroupUpdateProps {
  searchText: string | number
}

export default function GroupUpdate({
  searchText
}: IGroupUpdateProps) {


  const {
    slikRequestsGroupData
  } = useSelector((state: any) => state.SlikRequest)
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
  const [groupData, setGroupData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)
  const navigate = useNavigate();

  const differSpouseGarent = (data: any[]) => {
    return data.map((item: any) => {
      if (item.slikFlag === 'A' && item.clienteleType === 'CUSTOMER') {

        const guarantorsExist = Array.isArray(item.guarantors) && item.guarantors.length > 0;
        const spousesExist = Array.isArray(item.spouses) && item.spouses.length > 0;

        if (guarantorsExist || spousesExist) {
          return {
            ...item,
            children: [
              ...(guarantorsExist ? item.guarantors : []),
              ...(spousesExist ? item.spouses : []),
            ],
          }
        }
      }
      return item;
    });
  }

  console.log('[innerSlikRequestsGroupPaginatedData] - ', innerSlikRequestsGroupPaginatedData)

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
      render: (text, _record) => {
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
      render: (_value, record) => {
        if (record.clienteleType) {
          return <>{record.clienteleType}</>
        } else {
          return record.cltType === 'G' ? 'GUARANTOR' : 'SPOUSE'
        }
      }
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
              console.log('change 1')
            }}

          />
        } else {
          return <Input disabled={selectedRole === 'ADMIN' || record.cltType === 'S' || record.cltType === 'G'} onChange={(e) => {

            // Handle input changes here and update your data
            // e.target.value contains the new value of the input field
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
            // You can update the data array or state here
            console.log('change 2')
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

  const getGroupDataForExcel = () => {

    let slikArray = [];
    let slikDetails = {};
    slikRequestsGroupData.initialData?.map((slik: any) => {
      slikDetails = {
        "Appraisal No": slik.slikDto.appraisalId,
        "Branch": slik.slikDto.branchDesc,
        "MFO": slik.slikDto.createdBy,
        "Centre": slik.slikDto.centerCode,
        "Group No": slik.slikDto.groupIdx,
        "Customer Name": slik.slikDto.customerName,
        "NIK": slik.slikDto.customerKTP,
        "Customer Type": slik.slikDto.clienteleType,
        "Family C.NO": slik.familyCard,
        "Residential Address": slik.addLine1 + ',' + slik.addLine2 + ',' + slik.addLine3,
        "BR Name": slik.brName,
        "Contact No": slik.cltContact1,
        "Facility Type": "Group",
        "Batch No": ""
      };

      slikArray.push(slikDetails);
    });
    return slikArray;
  }
  useEffect(() => {
    getGroupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, searchText])

  useEffect(() => {
    if (slikRequestsGroupPaginatedData != null) {

      const slikArray = getGroupDataForExcel();
      setGroupData(slikArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slikRequestsGroupPaginatedData])


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
          <div className='flex justify-end py-10 w-full'>
            <Button
              onClick={() => exportToExcel(groupData, 'pending-slik-request')}
              loading={loading}
              type='primary'
              shape="round"
              size='middle'
              label='Download Excel'
              className={'mr-2'} />
          </div>
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
