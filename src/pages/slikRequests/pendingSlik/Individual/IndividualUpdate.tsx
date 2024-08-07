/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../../../store/store';
import { ColumnsType } from 'antd/es/table';
import { Input, Tag } from 'antd';
import formatAddress from '../../../../utils/getAddressByObjects';
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
    slikRequestsPaginatedData
  } = useSelector((state: any) => state.SlikRequest)
  const userData = useSelector((state: any) => state.AppData.userData)
  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const columns: ColumnsType<any> = [
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
      render(value) {
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

  useEffect(() => {
    getIndividualData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, searchText])


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
    </div>
  );
}
