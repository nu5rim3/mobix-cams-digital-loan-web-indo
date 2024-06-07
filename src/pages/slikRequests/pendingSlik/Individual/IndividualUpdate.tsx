import React, { useEffect, useState } from 'react';
import FPaginatedTable from '../../../../components/tables/FPaginatedTable';
import { useSelector } from 'react-redux';
import { actions } from '../../../../store/store';
import { ColumnsType } from 'antd/es/table';
import { Input, notification } from 'antd';
import Button from '../../../../components/Buttons/Button';
import { API } from '../../../../services/Services';
import formatAddress from '../../../../utils/getAddressByObjects';
import { exportToExcel } from "react-json-to-excel";
import copyToClipborad from '../../../../utils/copyToClipBorad';
import { CopyOutlined } from '@ant-design/icons'
export interface IIndividualUpdateProps {
  searchText: string
}

export default function IndividualUpdate({
  searchText
}: IIndividualUpdateProps) {

  const {
    slikRequestsIndividualData,
  } = useSelector((state: any) => state.SlikRequest)
  const userData = useSelector((state: any) => state.AppData.userData)
  const [loading, setLoading] = useState<boolean>(false)
  const [ableUpdate, setAbleData] = useState(true)
  const [individualData, setIndividualData] = useState<any[]>([]);
  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)

  const [requestsIndividualData, setRequestsIndividualData] = useState([])

  useEffect(() => {
    const newData = slikRequestsIndividualData.data.map((item: any) => {
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

    setRequestsIndividualData(newData)
  }, [slikRequestsIndividualData])

  const columns: ColumnsType<any> = [
    {
      title: 'Appraisal No',
      dataIndex: 'appraisalId',
      key: 'appraisalId',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record?.appraisalId?.toLowerCase()?.includes(typeof (value) == 'string' ? value.toLowerCase() : value)
      },
      render: (text, record) => {
        return <div className='w-56'><span className='w-full'>{text}</span> <span className='w-5 h-5 ml-2' onClick={() => copyToClipborad(text)}><CopyOutlined /></span></div>
      }
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      filteredValue: [searchText],
      render: (text, record) => {
        if (record.slikDto?.customerName) {
          return record.customerName
        } else {
          return record.fullName
        }
      },
    },
    {
      title: 'NIK',
      dataIndex: 'customerKTP',
      key: 'customecustomerKTPrName',
      render: (text, record) => {
        if (record.slikDto?.customerKTP) {
          return record.slikDto?.customerKTP
        } else {
          return record.ktp
        }
      },
    },
    {
      title: 'Family C.NO',
      dataIndex: 'familyCard',
      key: 'familyCard',
    },
    {
      title: 'Customer Type',
      dataIndex: 'clienteleType',
      key: 'clienteleType',
      render: (text, record) => {
        if (record.slikDto?.clienteleType) {
          return record.slikDto?.clienteleType
        } else {
          return record.cltType === 'G' ? 'GUARANTOR' : 'SPOUSE'
        }
      },
    },
    {
      title: 'Residential Address',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => (
        <>{
          formatAddress({
            address1: record.addLine1,
            address2: record.addLine2,
            address3: record.addLine3
          })
        }</>
      )
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
      render: (text, record) => {
        if (record.cltContact1) {
          return <>{record.cltContact1}</>
        } else {
          return record.cusContact1
        }
      },
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
              setAbleData(false)
              const newValue = e.target.value;
              const newData = slikRequestsIndividualData.data?.map((row: any) => {

                if (record.slikDto.slkIdx == row.slikDto.slkIdx) {

                  return {
                    ...row,
                    batchNumber: newValue
                  }
                } else {
                  return row
                }

              })
              actions.editIndividualData(newData)
              // You can update the data array or state here
            }}
          />
        } else {
          return <Input disabled={selectedRole === 'ADMIN' || record.cltType === 'S' || record.cltType === 'G'} />
        }
      }
    },
  ];

  const getIndividualData = () => {
    actions.getSlikByIndividual({
      userId: userData.data?.idx,
      branchCode: userData.data?.branches[0]?.code,
      status: 'P',
      type: "IL"
    })
  }
  const getIndividualDataForExcel = () => {
    let slikArray = [];
    let slikDetails = {};
    slikRequestsIndividualData.data?.map((slik: any) => {
      slikDetails = {
        "Appraisal No": slik.slikDto.appraisalId,
        "Branch": slik.slikDto.branchDesc,
        "MFO": slik.slikDto.createdBy,
        "Centre": "",
        "Group No": "",
        "Customer Name": slik.slikDto.customerName,
        "NIK": slik.slikDto.customerKTP,
        "Customer Type": slik.slikDto.clienteleType,
        "Family C.NO": slik.familyCard,
        "Residential Address": slik.addLine1 + ',' + slik.addLine2 + ',' + slik.addLine3,
        "BR Name": slik.brName,
        "Contact No": slik.cltContact1,
        "Facility Type": "Individual",
        "Batch No": ""
      };

      slikArray.push(slikDetails);
    });
    return slikArray;
  }
  useEffect(() => {
    getIndividualData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (slikRequestsIndividualData != null) {
      const slikArray = getIndividualDataForExcel();
      setIndividualData(slikArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slikRequestsIndividualData])

  const uploadData = async () => {
    try {
      setLoading(true)
      const data = slikRequestsIndividualData?.data
        ?.filter((row: any) => row.batchNumber)
        ?.map((row: any) => {
          return {
            ...row.slikDto,
            batchNumber: row.batchNumber
          }
        })
      await API.slikServices.updateSlikBulck(data)
      notification.success({
        message: 'Batches Updated Successfully'
      })
      getIndividualData()
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
      <FPaginatedTable
        loading={slikRequestsIndividualData.fetching}
        rowKey={'cltIdx'}
        columns={columns}
        dataSource={requestsIndividualData || []}
      />

      <div className='flex justify-end py-10 w-full '>

        <Button
          onClick={() => exportToExcel(individualData, 'pending-slik-request')}
          loading={loading}
          type='primary'
          shape="round"
          size='large'
          label='Download Excel'
          className={'mr-2'} />

        <Button
          onClick={uploadData}
          loading={loading}
          type='primary'
          shape="round"
          size='large'
          label='Update Batch'
          disabled={ableUpdate || selectedRole === 'ADMIN'}
        />
      </div>

    </div>
  );
}
