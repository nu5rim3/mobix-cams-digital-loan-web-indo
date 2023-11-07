import React, {useEffect, useState} from 'react';
import FPaginatedTable from '../../../../components/tables/FPaginatedTable';
import { useSelector } from 'react-redux';
import { actions } from '../../../../store/store';
import { ColumnsType } from 'antd/es/table';
import { Input, notification } from 'antd';
import Button from '../../../../components/Buttons/Button';
import { API } from '../../../../services/Services';
import formatAddress from '../../../../utils/getAddressByObjects';

export interface IIndividualUpdateProps {
  searchText: string
}

export default function IndividualUpdate ({
  searchText
}: IIndividualUpdateProps) {
  
  const {
    slikRequestsIndividualData,
  } = useSelector((state: any) => state.SlikRequest)
  const userData = useSelector((state: any) => state.AppData.userData)
  const [loading, setLoading] = useState<boolean>(false)

  const columns: ColumnsType<any> = [
    // {
    //   title: 'Center',
    //   dataIndex: 'centerCode',
    //   key: 'center',
    // },
    // {
    //   title: 'Group No',
    //   dataIndex: 'groupIdx',
    //   key: 'groupIdx',
    // },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      filteredValue: [searchText],
      render: (text, record) => (
        <>{record.slikDto?.customerName}</>
      )
      // onFilter: (value, record) => {
      //   return record?.customerName?.toLowerCase()?.includes(typeof(value) == 'string'? value.toLowerCase(): value)
      // }
    },
    {
      title: 'NIK',
      dataIndex: 'customerKTP',
      key: 'customecustomerKTPrName',
      render: (text, record) => (
        <>{record.slikDto?.customerKTP}</>
      )
    },
    {
      title: 'Family C.NO',
      dataIndex: 'familyCard',
      key: 'familyCard',
    },
    {
      title: 'Residential Address',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => (
        <>{ formatAddress({
          address1 :record.addLine1,
          address2: record.addLine2,
          address3: record.addLine3
      })}</>
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
            const newData = slikRequestsIndividualData.data?.map((row:any) => {
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
            actions.editIndividualData(newData)
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

  const getIndividualData = () => {
      actions.getSlikByIndividual({
        userId: userData.data?.idx,
        branchCode: userData.data?.branches[0]?.code,
        status: 'P',
        type: "IL"
      })
  }

  useEffect(() => {
      getIndividualData()
  },[])

  const uploadData = async () => {
    try{
      setLoading(true)
      const response = await API.slikServices.updateSlikBulck(slikRequestsIndividualData?.data?.filter((row:any) => row.batchNumber))
      notification.success({
          message: 'Batches Updated Successfully'
      })
      getIndividualData()
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
        <FPaginatedTable 
            loading={slikRequestsIndividualData.fetching}
            rowKey={'slkIdx'}
            columns={columns} 
            dataSource={slikRequestsIndividualData.data|| []}
        />
        
        <div className='flex justify-center p-10 w-full'>
          <Button 
            onClick={uploadData} 
            loading={loading}
            type='primary'
            shape="round"
            size='large'
            label='Update Batch'
          />
      </div>
    </div>
  );
}
