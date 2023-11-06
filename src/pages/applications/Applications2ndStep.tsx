import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../services/Services';
import { ColumnsType } from 'antd/es/table';
import { DatePicker, Input, Modal, Select, Space, Tag, notification, theme } from 'antd';
import BreadCrumbContainer from '../../components/Containers/BreadCrumbContainer';
import Title from '../../components/Typography/Tytle';
import Paragraph from 'antd/es/typography/Paragraph';
import ContentContainer from '../../components/Containers/ContentContainer';
import Search from '../../components/Search/Search';
import FPaginatedTable from '../../components/tables/FPaginatedTable';
import Button from '../../components/Buttons/Button';
import { useSelector } from 'react-redux';
import { actions } from '../../store/store';
import moment from 'moment';
import ButtonContainer from '../../components/Buttons/Button';
import { ExclamationCircleFilled } from '@ant-design/icons';

export interface IApplicationsProps {

}

export default function Applications2ndStep (props: IApplicationsProps) {
    const navigate = useNavigate();
  const [users, setUsers] = useState<[]>([])
  const [searchStatus, setSearchStatus] = useState<string>('')
  const [searchAppraisal, setSearchAppraisal] = useState<string | null>(null)
  const [fromDateFilter, setFromDateFilter] = useState(null);
  const [toDateFilter, setToDateFilter] = useState(null);
  const {
    token: {colorTextHeading},
  } = theme.useToken();
//   const {
//     customerData,
//     financialDetails
// } = useSelector((state: any) => state.Application)

  const {
    applications
  } = useSelector((state: any) => state.Application)

  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)
  
  useEffect(() => {
    actions.getAllApplications({
      role: selectedRole
    })
  }, [])

  const { confirm } = Modal;

  const handleFromDateFilterChange = (date:any) => {
    if(date){
      setFromDateFilter(date.format('YYYY-MM-DD'));
    }else{
      setFromDateFilter(null);
    }
  };
  
  const handleToDateFilterChange = (date:any) => {
    if(date){
      setToDateFilter(date.format('YYYY-MM-DD'));
    }else{
      setToDateFilter(null)
    }
  };

  const searchData = () => {
    actions.getAllApplications({
      role: selectedRole,
      appraisalId: searchAppraisal,
      fromDate: fromDateFilter,
      toDate: toDateFilter,
      status: searchStatus
    })
  }

  const showPromiseConfirm = (type:string, record: any) => {
    console.log('record', record)
    confirm({
      title: 'Second Meeting Confirmation',
      icon: <ExclamationCircleFilled />,
      content: `Do you confirm and ${type} second meeting of this customer ?`,
      onOk:  async() =>  {
        new Promise(async (resolve, reject) => {
          try{
            const data = {
              appraisalIdx: record.idx,
              secondMeetingStepAction: type,
              secondMeetingStepStatus: type,
              appraisalType: record.appraisalType,
              loanProduct: record.loanProduct,
              loanAmount: record.loanAmount,
              loanTerm: record.loanTerm
            }
  
            const save = await API.approvalServices.createScondMeetingStep(data)
  
            notification.success({
              message: 'Application Updated Successfully.'
            })
  
            return resolve
          }
          catch{
            // return reject
          }
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    })
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Appraisal ID',
      dataIndex: 'idx',
      key: 'idx',
      // filteredValue: [searchAppraisal],
      // onFilter: (value, record) => {
      //   return record?.idx?.toLowerCase()?.includes(typeof(value) == 'string'? value?.toLowerCase(): value)
      // },
      render: (_, { status, idx }) => (
        <>
          {status === "P" 
          ? <Tag color='yellow' key={status}>
              {idx}
            </Tag>
          : status === "R" 
          ?<Tag color='red' key={status}>
              {idx}
            </Tag>
          : status === "C" 
          ? <Tag color='green' key={status}>
                {idx}
            </Tag>
          :<Tag color='' key={status}>
              {idx}
          </Tag>
          }
        </>
      ),
    },
    {
      title: 'Contract ID',
      dataIndex: 'contractNo',
      key: 'contractNo',
      // filteredValue: [searchStatus],
      // onFilter: (value, record) => {
      //   return value == "All"? true
      //     : record?.status?.toLowerCase()?.includes(typeof(value) == 'string'? value?.toLowerCase(): value)
      //   },
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Customer NIK',
      dataIndex: 'tcNo',
      key: 'tcNo',
    },
    {
      title: 'Customer Name',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
        title: 'Created At',
        dataIndex: 'creationDate',
        key: 'creationDate',
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
      },
      {
        title: 'Branch Name',
        dataIndex: 'branchName',
        key: 'branchName',
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Space size="middle" className='mr-3'>
            <a onClick={() => navigate(`/applications/viewApplication/APP00000000123`)}>View</a>
          </Space>
            <Space size="middle" className='mr-3'>
            <a onClick={() => showPromiseConfirm('Approve', record)}>Approve</a>
          </Space>
          <Space size="middle" className='mr-3'>
            <a onClick={() => showPromiseConfirm('Reject', record)}>Reject</a>
          </Space>
        </>
      ),
    },
  ];

  // const filteredData = applications.data?.filter((item:any) => {
  //   if (!fromDateFilter || !toDateFilter) {
  //     return true; // No filters selected, show all data
  //   }
  
  //   const itemDate = moment(item.creationDate, 'YYYY-MM-DD');
    
  //   return (
  //     itemDate.isSameOrAfter(fromDateFilter, 'day') &&
  //     itemDate.isSameOrBefore(toDateFilter, 'day')
  //   );
  // });

  return (
    <div>
      <BreadCrumbContainer>
        <Paragraph className='m-0 p-0 ' style={{margin: 0, padding:0}}  type="secondary">Home</Paragraph>
        <Title 
          level={4}
          title='Application Approval'
        />
      </BreadCrumbContainer>


      <ContentContainer >
        <Title 
          style={{color: '#374957'}} 
          level={4}
          title='Appraisal Origination'
        /> 
        <Title 
          style={{margin: 1}} 
          level={5}
          title='Search Items'
        />

        <div className='flex mt-1 mb-3 items-center'>
            <Select
                className='mr-2'
                size={'large'}
                // allowClear
                onChange={(value) => {
                    setSearchStatus(value)
                }}
                style={{ width: 200 }}
                placeholder='Select A Status'
                options={[
                    {
                        value: null,
                        label: 'All'
                    },
                    {
                        value: 'PENDING',
                        label: 'Pending'
                    },
                    {
                      value: 'RETURNED',
                      label: 'Returned'
                    },
                    {
                      value: 'APPROVED',
                      label: 'Approved'
                    },
                    {
                      value: 'REJECTED',
                      label: 'Rejected'
                    },
                ]}
            />
            <Input 
              size={'large'} 
              placeholder='Appraisal ID' 
              className='mr-2 w-2/6'
              allowClear
              onChange={(e) => setSearchAppraisal(e.target.value)}
            />
            <DatePicker size={'large'} onChange={handleFromDateFilterChange} />
            <div className='m-2 font-bold' style={{color: colorTextHeading}}>
                To 
            </div>
            <DatePicker size={'large'} onChange={handleToDateFilterChange} />
            <ButtonContainer 
              type='primary' 
              label='Search' 
              size='large' 
              className='ml-3'
              onClick={() => {
                searchData()
            }}/>
            {/* <Search
            onChange={(value:any) => setSearchText(value)}
            /> */}
        </div>

        <div
         className='border-l-current border-r-current'
        >
          <FPaginatedTable 
            loading={applications.fetching}
            // loading={false}
            rowKey={'idx'}
            columns={columns} 
            dataSource={applications.data || [] }
          />
        </div>

        {/* <div className='flex justify-center p-10'>
          <Button 
            onClick={() => {
              navigate('/userManagement/createUser')
            }} 
            type='primary'
            shape="round"
            size='large'
            icon={<PlusOutlined/>}
            label="Create New User"
          />
        </div> */}
      </ContentContainer>
    </div>
  )
}
