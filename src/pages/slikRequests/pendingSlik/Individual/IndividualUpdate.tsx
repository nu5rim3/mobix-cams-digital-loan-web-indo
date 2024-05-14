import React, { useEffect, useState } from 'react';
import FPaginatedTable from '../../../../components/tables/FPaginatedTable';
import { useSelector } from 'react-redux';
import { actions } from '../../../../store/store';
import { ColumnsType } from 'antd/es/table';
import { Input, notification, Space } from 'antd';
import Button from '../../../../components/Buttons/Button';
import { API } from '../../../../services/Services';
import formatAddress from '../../../../utils/getAddressByObjects';
import { JsonToExcel } from "react-json-to-excel";
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
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      filteredValue: [searchText],
      render: (text, record) => (
        <>{ record.slikDto ?.customerName}</>
      ),
  onFilter: (value, record) => {
    return record ?.slikDto ?.customerName ?.toLowerCase() ?.includes(typeof (value) == 'string' ? value.toLowerCase() : value)
      }
},
{
  title: 'NIK',
    dataIndex: 'customerKTP',
      key: 'customecustomerKTPrName',
        render: (text, record) => (
        <>{ record.slikDto ?.customerKTP}</>
      )
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
              setAbleData(false)
              const newValue = e.target.value;
              const newData = slikRequestsIndividualData.data ?.map((row: any) => {

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
    userId: userData.data ?.idx,
    branchCode: userData.data ?.branches[0] ?.code,
    status: 'P',
    type: "IL"
  })
}
const getIndividualDataForExcel = () => {
  let slikArray = [];
  let slikDetails = {};
  slikRequestsIndividualData.data ?.map((slik: any) => {
    slikDetails = {
      "Appraisal No": slik.slikDto.appraisalId,
      "Branch": "",
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


}, [])
useEffect(() => {
  if (slikRequestsIndividualData != null) {
    let slikArray = getIndividualDataForExcel();
    setIndividualData(slikArray);
  }
}, [slikRequestsIndividualData])
const uploadData = async () => {
  try {
    setLoading(true)
    const data = slikRequestsIndividualData ?.data
      ?.filter((row: any) => row.batchNumber)
        ?.map((row: any) => {
          return {
            ...row.slikDto,
            batchNumber: row.batchNumber
          }
        })
         
    const response = await API.slikServices.updateSlikBulck(data)
    notification.success({
      message: 'Batches Updated Successfully'
    })
    getIndividualData()
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
    <FPaginatedTable
      loading={slikRequestsIndividualData.fetching}
      rowKey={'slkIdx'}
      columns={columns}
      dataSource={slikRequestsIndividualData.data || []}
    />

    <div className='flex justify-center p-10 w-full '>
      <JsonToExcel
        type='primary' shape="round"
        title="Download Excel"
        loading={loading}
        data={individualData}
        fileName="pending-slik-request"
        btnClassName="custom download-button  ant-btn css-dev-only-do-not-override-c5cmmx ant-btn-round ant-btn-primary ant-btn-lg gap-5 pt-2"
      />

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
