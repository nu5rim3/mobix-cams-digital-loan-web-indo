import * as React from 'react';
import Title from '../../../components/Typography/Tytle';
import Search from '../../../components/Search/Search';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FPaginatedTable from '../../../components/tables/FPaginatedTable';
import { actions } from '../../../store/store';
import { Input, Select, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import ButtonContainer from '../../../components/Buttons/Button';
import { act } from 'react-dom/test-utils';
import { API } from '../../../services/Services';
import { JsonToExcel } from "react-json-to-excel";

export interface INonPendingSlikProps {
}

export default function NonPendingSlik(props: INonPendingSlikProps) {

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('')
  const [branch, setBranch] = useState<any[]>([])
  const [showBranch, setShowBranch] = useState()
  const [inProgressData, setInProgressData] = useState<any[]>([]);
  const [completedData, setCompletedData] = useState<any[]>([]);
  const {
    selectedStatus,
    slikRequestsData,
    selectedBranch
  } = useSelector((state: any) => state.SlikRequest)
  const {
    userData,
    selectedRole
  } = useSelector((state: any) => state.AppData)

  const columnsInProgress: ColumnsType<any> = [
    {
      title: 'Center',
      dataIndex: 'fusionCenterCode',
      key: 'fusionCenterCode',
      filteredValue: [searchText],
      // onFilter: (value, record) => {
      //   return record?.centerCode?.toLowerCase()?.includes(typeof(value) == 'string'? value.toLowerCase(): value)
      // }
    },
    {
      title: 'Group No',
      dataIndex: 'groupIdx',
      key: 'groupIdx',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record ?.customerName ?.toLowerCase() ?.includes(typeof (value) == 'string' ? value.toLowerCase() : value)
      }
    },
    {
      title: 'NIK',
      dataIndex: 'customerKTP',
      key: 'customecustomerKTPrName',
    },
    {
      title: 'Customer Type',
      dataIndex: 'clienteleType',
      key: 'clienteleType'
    },
    {
      title: 'Family C.NO',
      dataIndex: 'clienteleIdx',
      key: 'clienteleIdx',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      render: (_, record) => (
        <Space size="middle">
          {showBranch}
        </Space>
      )
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/indo-digital-loan/auth/slikRequest/updateSlik/${record.slkIdx}`)}>Update {record.name}</a>
        </Space>
      ),
    },
  ];
  const columnsCompleted: ColumnsType<any> = [
    {
      title: 'Center',
      dataIndex: 'fusionCenterCode',
      key: 'fusionCenterCode',
      filteredValue: [searchText],
      // onFilter: (value, record) => {
      //   return record?.centerCode?.toLowerCase()?.includes(typeof(value) == 'string'? value.toLowerCase(): value)
      // }
    },
    {
      title: 'Group No',
      dataIndex: 'groupIdx',
      key: 'groupIdx',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record ?.customerName ?.toLowerCase() ?.includes(typeof (value) == 'string' ? value.toLowerCase() : value)
      }
    },
    {
      title: 'NIK',
      dataIndex: 'customerKTP',
      key: 'customecustomerKTPrName',
    },
    {
      title: 'Customer Type',
      dataIndex: 'clienteleType',
      key: 'clienteleType'
    },
    {
      title: 'Family C.NO',
      dataIndex: 'clienteleIdx',
      key: 'clienteleIdx',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      render: (_, record) => (
        <Space size="middle">
          {showBranch}
        </Space>
      )
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/indo-digital-loan/auth/slikRequest/viewSlik/${record.slkIdx}`)}>View {record.name}</a>
        </Space>
      ),
    },
  ];

  const getRequestData = () => {
    if (!(selectedRole == 'ADMIN' || selectedRole == 'SLIKU')) {
      return actions.getSlikRequests({
        userId: userData.data ?.idx,
        branchCode: userData.data ?.branches[0] ?.code,
      })
    } else if (selectedBranch) {
      setShowBranch(branch.find((branch: any) => {
        return branch.code == selectedBranch
      }) ?.description || userData.data ?.branches[0] ?.description)
      return actions.getSlikRequests({
        userId: userData.data ?.idx,
        branchCode: selectedBranch,
      })
    }
  }

  const getBranchData = async () => {
    const branches = await API.branchServices.getAllBranches()
    setBranch(branches.data)
  }

  const getDataForExcel = (data) => {

    let slikArray = [];
    let slikDetails = {};
    data ?.map((slik: any) => {

      slikDetails = {
        "Branch": "",
        "MFO": slik.slikDto.createdBy,
        "Centre": slik.slikDto.centerCode,
        "Group No": slik.slikDto.groupIdx,
        "Customer Name": slik.slikDto.customerName,
        "NIK": slik.slikDto.customerKTP,
        "Customer Type": slik.slikDto.clienteleType,
        "Family C.NO": slik.familyCard,
        "Residential Address": slik.addLine1,
        "BR Name": slik.brName,
        "Contact No": slik.cltContact1,
        "Facility Type": slik.slikDto.appraisalType === 'GRPL' ? "Group" : "Individual",
        "Batch No": slik.slikDto.batchNumber
      };

      slikArray.push(slikDetails);
    });
    {/* if (selectedStatus === 'inprogress') {
 setInProgressData(slikArray);
    } else if (inprogress === 'completed') {

    } */}
    return slikArray;
  }

  {/* useEffect(() => {
    if (slikRequestsData != null && selectedStatus != null) {

      let slikInProgress = getDataForExcel('inprogress', 'INPG');
      //setInProgressData(slikInProgress);
      let slikCompleted = getDataForExcel('completed', 'C');
      setCompletedData(slikCompleted);
    }
  }, [slikRequestsData, selectedStatus]) */}


  useEffect(() => {
    getRequestData()
    getBranchData()
  }, [selectedStatus])

  return (
    <div>
      <Title
        style={{ margin: 1 }}
        level={5}
        title='Search Items'
      />

      <div className='flex mt-1 mb-3 items-center '>
        {(selectedRole == 'ADMIN' || selectedRole == 'SLIKU') ?
          <>
          <Select
            className='mr-2 '
            size={'large'}
            allowClear
            onChange={(value) => {
              actions.SRSetBranch(value)
            }}
            showSearch
            value={selectedBranch}
            style={{ width: 200 }}
            placeholder='Select A Branch'
            filterOption={(input, option) => (option ?.label ?.toLowerCase() ?? '').includes(input)}
            options={
              branch.length ?
                branch ?.map((branch: any) => {
                  return ({
                    value: branch.code,
                    label: branch.description,
                  })
                })
                  : []
            }
          />
          </>
        : null}
        <Search
          onChange={(value: any) => setSearchText(value)}
          className={'pb-0'}
        />
        {(selectedRole == 'ADMIN' || selectedRole == 'SLIKU') ?
          <>
          <ButtonContainer
            disabled={!selectedBranch}
            type='primary'
            label='Search'
            size='large'
            className='ml-3'
            onClick={() => {
              getRequestData()
            }} />
          {/* <JsonToExcel
            title="Download Excel"
            data={selectedStatus === 'inprogress' ? getDataForExcel(slikRequestsData.data.filter((data: any) => data.status == "INPG")) : getDataForExcel(slikRequestsData.data.filter((data: any) => data.status == "C" || data.status == "A"))}
            fileName="sample-file"
            btnClassName=" ant-btn css-dev-only-do-not-override-c5cmmx ant-btn-primary ant-btn-lg ml-3"
          /> */}
          </>
        : null}
      </div>

      <div
        className='border-l-current border-r-current'
      >
        <FPaginatedTable
          loading={slikRequestsData.fetching}
          rowKey={'slkIdx'}
          columns={selectedStatus === 'inprogress' ? columnsInProgress : columnsCompleted}
          dataSource={
            selectedStatus === 'inprogress'
              ? slikRequestsData.data.filter((data: any) => data.status == "INPG")
              : slikRequestsData.data.filter((data: any) => data.status == "C" || data.status == "A") || []}
        />
      </div>
    </div>
  );
}
