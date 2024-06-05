import React, { useEffect, useState } from 'react';
import FPaginatedTable from '../../../../components/tables/FPaginatedTable';
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
  const [groupData, setGroupData] = useState<any[]>([]);
  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)

  const differSpouseGarent = (data: any[]) => {
    console.log('[differSpouseGarent - ] ', data)
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


  const columns: ColumnsType<any> = [
    {
      title: 'Center',
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
        return record?.createdBy?.toLowerCase()?.includes(typeof (value) == 'string' ? value.toLowerCase() : value)
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
          <a onClick={() => {
            const select = slikRequestsGroupData.initialData.filter((row: any) => (row.centerCode == record.centerCode) && (row.groupIdx == record.groupIdx))
            setSelectedGroup(differSpouseGarent([{ ...select[0].slikDto, familyCard: select[0].familyCard, addLine1: select[0].addLine1, addLine2: select[0].addLine2, addLine3: select[0].addLine3, brName: select[0].brName, cltContact1: select[0].cltContact1 }]))
          }}>View</a>
        </Space>
      ),
    },
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
      render: (text, record) => {
        console.log('[RECORD] - ', record)
        return <div className='w-56 sm:4/5 flex justify-between'><span className='w-full'>{text}</span> <span className='w-5 h-5' onClick={() => copyToClipborad(text)}><CopyOutlined /></span></div>
      }
    },
    {
      title: 'Center',
      dataIndex: 'fusionCenterCode',
      key: 'fusionCenterCode',
    },
    {
      title: 'Group No',
      dataIndex: 'groupIdx',
      key: 'groupIdx',
      render: (value, record) => {
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
      render: (value, record) => {
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
      render: (value, record) => {
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
      render: (value, record) => {
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
      render: (text, record) => {
        console.log('[TABLE RECORD] - ', record)
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
      render: (text, record) => {
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
            }}
          />
        } else {
          return <Input disabled={selectedRole === 'ADMIN' || record.cltType === 'S' || record.cltType === 'G'} />
        }
      }
    },
  ];

  const getGroupData = () => {
    actions.getSlikByGroup({
      userId: userData.data?.idx,
      branchCode: userData.data?.branches[0]?.code, //'TJP',
      status: 'P',
      type: 'GRPL',
      pageNumber: 1,
      pageSize: 20
    });
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



  }, [])

  useEffect(() => {
    if (slikRequestsGroupData != null) {

      let slikArray = getGroupDataForExcel();
      setGroupData(slikArray);
    }
  }, [slikRequestsGroupData])


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
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className='border-l-current border-r-current'
    >
      {!selectedGroup
        ?
        <>
          <FPaginatedTable
            loading={slikRequestsGroupData.fetching}
            rowKey={'slkIdx'}
            columns={columns}
            dataSource={slikRequestsGroupData.data || []}
          />
          <div className='flex justify-end py-10 w-full'>
            <Button
              onClick={() => exportToExcel(groupData, 'pending-slik-request')}
              loading={loading}
              type='primary'
              shape="round"
              size='large'
              label='Download Excel'
              className={'mr-2'} />
          </div>
        </>
        :
        <>
          <FPaginatedTable
            loading={slikRequestsGroupData.fetching}
            rowKey={'key'}
            columns={columnsNew}
            dataSource={selectedGroup || []}
            rowSelection={true}
          />

          <div className='flex justify-end py-10 w-full'>

            <Button
              className={'mr-2'}
              type='primary'
              shape="round"
              size='large'
              label='Back'
              onClick={() => setSelectedGroup(null)} />
            <Button
              onClick={uploadData}
              loading={loading}
              type='primary'
              shape="round"
              size='large'
              disabled={selectedRole === 'ADMIN'}
              label='Update Batch'
            />


          </div>
        </>

      }
    </div>
  );
}
