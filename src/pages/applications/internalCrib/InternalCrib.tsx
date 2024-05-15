import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../../services/Services';
import { ColumnsType } from 'antd/es/table';
import { DatePicker, Typography, Input, Select, Space, Tag, theme } from 'antd';
// import BreadCrumbContainer from '../../components/Containers/BreadCrumbContainer';
import Title from '../../../components/Typography/Tytle';
import Paragraph from 'antd/es/typography/Paragraph';
// import ContentContainer from '../../components/Containers/ContentContainer';
import FPaginatedTable from '../../../components/tables/FPaginatedTable';
import Button from '../../../components/Buttons/Button';
import { useSelector } from 'react-redux';
import { actions } from '../../../store/store';
import moment from 'moment';
import ButtonContainer from '../../../components/Buttons/Button';

export interface IInternalCribProps {

}

export default function InternalCrib(props: IInternalCribProps) {
  let { id } = useParams();
  const [internalCribData, setInternalCribData] = useState<[]>([])

  const fetchData = async (id) => {
    console.log("id " + id)
    const cribDetails = await API.internalCribServices.getInternalCribByClientele(id);
    setInternalCribData(cribDetails);
  };
  useEffect(() => {
    if (id) {
      fetchData(id);
    }

  }, [])
  const columns: ColumnsType<any> = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Client Type',
      dataIndex: 'clientType',
      key: 'clientType',
    },
    {
      title: 'Contract No',
      dataIndex: 'contractNo',
      key: 'contractNo',
    },
    {
      title: 'Contract Status',
      dataIndex: 'contractStatus',
      key: 'contractStatus',
    },
    {
      title: 'Pay Type',
      dataIndex: 'payType',
      key: 'payType',

    },
    {
      title: 'Rents Paid',
      key: 'rentsPaid',
      dataIndex: 'rentsPaid',

    },
    {
      title: 'Company Code',
      dataIndex: 'companyCode',
      key: 'companyCode',
    },
    {
      title: 'Asset Type',
      dataIndex: 'assetType',
      key: 'assetType',
    },

    {
      title: 'Leased Value',
      dataIndex: 'leasedValue',
      key: 'leasedValue',
    },
    {
      title: 'Current Rent',
      dataIndex: 'currentRent',
      key: 'currentRent',
    },
    {
      title: 'Future Rent',
      dataIndex: 'futureRent',
      key: 'futureRent',
    },
    {
      title: 'Total Dues',
      dataIndex: 'totalDues',
      key: 'totalDues',
    },
    {
      title: 'Overdue Interest',
      dataIndex: 'overdueInterest',
      key: 'overdueInterest',
    },
    {
      title: 'No of Installments Arrears',
      dataIndex: 'nofInstallmentsArrears',
      key: 'nofInstallmentsArrears',
    },
    {
      title: 'Contract Expiry Date',
      dataIndex: 'contractExpiryDate',
      key: 'contractExpiryDate',
    },
  ];

  return (
    <div>

      <Typography.Title level={4}>Clientele Id : {id}</Typography.Title>
      <Paragraph>
        INTERNAL CRIB DETAILS
      </Paragraph>
      <div className='border-l-current border-r-current'>
        <FPaginatedTable

          // loading={false}

          columns={columns}
          dataSource={internalCribData.data || []}
        />
      </div>
    </div >
  )
}
