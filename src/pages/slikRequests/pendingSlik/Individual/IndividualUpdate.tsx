import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../../../store/store';
import { ColumnsType } from 'antd/es/table';
import { Input, notification, Tag } from 'antd';
import { API } from '../../../../services/Services';
import formatAddress from '../../../../utils/getAddressByObjects';
import { exportToExcel } from "react-json-to-excel";
import { CopyOutlined } from '@ant-design/icons'
import BPaginatedTable from '../../../../components/tables/BPaginatedTable';
import copyToClipborad from '../../../../utils/copyToClipBorad';
export interface IIndividualUpdateProps {
  searchText: string | number
}

export default function IndividualUpdate({
  searchText
}: IIndividualUpdateProps) {

  const {
    slikRequestsIndividualData
  } = useSelector((state: any) => state.SlikRequest)
  const {
    slikRequestsPaginatedData
  } = useSelector((state: any) => state.SlikRequest)

  const userData = useSelector((state: any) => state.AppData.userData)
  const [loading, setLoading] = useState<boolean>(false)
  const [ableUpdate, setAbleData] = useState(true)
  const [individualData, setIndividualData] = useState<any[]>([]);
  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)

  const [requestsIndividualData, setRequestsIndividualData] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  // useEffect(() => {

  //   const newData = slikRequestsIndividualData.data.map((item: any) => {
  //     if (item.slikFlag === 'A' && item.clienteleType === 'CUSTOMER') {
  //       const guarantorsExist = Array.isArray(item.guarantors) && item.guarantors.length > 0;
  //       const spousesExist = Array.isArray(item.spouses) && item.spouses.length > 0;

  //       if (guarantorsExist || spousesExist) {
  //         return {
  //           ...item,
  //           children: [
  //             ...(guarantorsExist ? item.guarantors : []),
  //             ...(spousesExist ? item.spouses : []),
  //           ],
  //         }
  //       }
  //     }
  //     return item;
  //   });

  //   setRequestsIndividualData(newData)
  // }, [slikRequestsIndividualData])

  const columns: ColumnsType<any> = [
    // {
    //   title: 'Center',
    //   dataIndex: 'centerCode',
    //   key: 'center',
    // },
    {
      title: 'Appraisal No',
      dataIndex: 'appraisalId',
      key: 'appraisalId',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record?.appraisalId?.toLowerCase()?.includes(typeof (value) == 'string' ? value.toLowerCase() : value)
      },
      render: (text, record) => {
        return <div className='w-56 sm:w-4/5 flex justify-between'><span>{text}</span> <span onClick={() => copyToClipborad(text)}><CopyOutlined /></span></div>
      }
    },
    {
      title: 'Customer Name',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'NIK',
      dataIndex: 'ktp',
      key: 'ktp',
    },
    {
      title: 'Family C.NO',
      dataIndex: 'familyCard',
      key: 'familyCard',
    },
    {
      title: 'Customer Type',
      dataIndex: 'cltType',
      key: 'cltType',
      align: 'center',
      render: (text, record) => {
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
      render: (_, record) => (
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
      render(value, record, index) {
        return <div className='flex justify-between'>
          <a href={`tel:${value}`}>{value}</a>
        </div>
      },
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      align: 'center',
      render: (_, record) => {
        return <Input className='w-56' disabled={selectedRole === 'ADMIN' || record.postCltFlag === 'N'} onChange={(e) => {
          setAbleData(false)
          const newValue = e.target.value;
          const newData = slikRequestsPaginatedData?.data?.content?.map((row: any) => {

            if (record.slikIdx === row.slikIdx) {

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
        }} />
      }
    },
  ];

  const getIndividualData = () => {
    // actions.getSlikByIndividual({
    //   userId: userData.data?.idx,
    //   branchCode: userData.data?.branches[0]?.code,
    //   status: 'P',
    //   type: "IL"
    // })

    actions.getSliksWithPagination({
      userId: '',
      branchCode: userData.data?.branches[0]?.code,
      status: 'P',
      type: "IL",
      page: searchText !== '' ? currentPage : currentPage,
      size: searchText !== '' ? pageSize : pageSize,
      appriasalId: searchText
    })

    if (searchText !== '') {
      setCurrentPage(1)
      setPageSize(7)
    }
  }
  const getIndividualDataForExcel = () => {
    const slikArray: any[] = [];
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
  }, [pageSize, currentPage, searchText])

  // useEffect(() => {
  //   if (slikRequestsIndividualData != null) {
  //     const slikArray = getIndividualDataForExcel();
  //     setIndividualData(slikArray);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [slikRequestsIndividualData])

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

  return (
    <div
      className='border-l-current border-r-current'
    >
      <BPaginatedTable
        loading={slikRequestsPaginatedData.fetching}
        rowKey={'slikIdx'}
        columns={columns}
        dataSource={slikRequestsPaginatedData?.data?.content ?? []}
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
      />
      {/* 
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
      </div> */}

    </div>
  );
}
