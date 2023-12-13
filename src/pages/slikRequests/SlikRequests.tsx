import React, { useState } from 'react';
import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Paragraph from 'antd/es/typography/Paragraph';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import {useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/store';
import BreadCrumbContainer from '../../components/Containers/BreadCrumbContainer';
import Title from '../../components/Typography/Tytle';
import ContentContainer from '../../components/Containers/ContentContainer';
import NonPendingSlik from './nonPendingSlik/NonPendingSlik';
import PendingSlik from './pendingSlik/PendingSlik';



const SlikRequests: React.FC = () =>{

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('')
  const dispatch = useDispatch()

  const selectedType = useSelector((state: any) => state.SlikRequest.selectedType)
  const selectedStatus = useSelector((state: any) => state.SlikRequest.selectedStatus)
  const {selectedRole} = useSelector((state: any) => state.AppData)

  const columns: ColumnsType<any> = [
    {
      title: 'Center',
      dataIndex: 'userName',
      key: 'userName',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record.userName.toLowerCase().includes(typeof(value) == 'string'? value.toLowerCase(): value)
      }
    },
    {
      title: 'Group Number',
      dataIndex: 'profileUser',
      key: 'profileUser',
    },
    {
      title: 'MFO Username',
      dataIndex: 'branches',
      key: 'branches',
      render: (record) => {
        let view = ''
        record.map(({description}: {description: string}) => {
          return view? view = view+`/${description}` : view = description
        })
        return <>{view}</>
      }
    },
    {
      title: 'Date',
      dataIndex: 'roles',
      key: 'roles',
      render: (record) => {
        let view = ''
        record.map(({code}: {code: string}) => {
          return view? view = view+`/${code}` : view = code
        })
        return <>{view}</>
      }
    },
    {
      title: 'Customer Count',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { status }) => (
        <>
          {status === "A" 
          ? <Tag color='green' key={status}>
              Active
            </Tag>
          :<Tag color='green' key={status}>
            Active
          </Tag>
          }
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/indo-digital-loan/userManagement/updateUser/${record.idx}`)}>View {record.name}</a>
        </Space>
      ),
    },
  ];

  const itemsOne: TabsProps['items'] = [
    {
      key: 'inprogress',
      label: 'Requests In-Progress',
      children: '',
    },
    {
      key: 'completed',
      label: 'Requests Completed',
      children: '',
    },
  ];

  const itemsTwo: TabsProps['items'] = [
    {
      key: 'pending',
      label: 'Requests Pending',
      children: '',
    },
    {
      key: 'completed',
      label: 'Requests Completed',
      children: '',
    },
  ];

  const itemsThree: TabsProps['items'] = [
    {
      key: 'pending',
      label: 'Requests Pending',
      children: '',
    },
    {
      key: 'inprogress',
      label: 'Requests In-Progress',
      children: '',
    },
    {
      key: 'completed',
      label: 'Requests Completed',
      children: '',
    },
  ];


  const plainOptions = [
     { label: 'Group Loan', value: 'group' },
     { label: 'Individual', value: 'individual' },
  ];

  const roleViseItems = () => {
    return selectedRole.includes('ADMIN')? 
            itemsThree
          : selectedRole.includes('CSA')?
            itemsTwo
          : selectedRole.includes('SLIKU')?
            itemsOne
          : itemsOne
          
  }

  return (
    <div>
      <BreadCrumbContainer>
        <Paragraph className='m-0 p-0 ' style={{margin: 0, padding:0}}  type="secondary">Home</Paragraph>
        <Title 
          level={4}
          title='SLIK Requests'
        />
      </BreadCrumbContainer>

      <ContentContainer>
        <Tabs 
          activeKey={selectedStatus} 
          defaultActiveKey={roleViseItems()[0]?.key}
          items={roleViseItems()} 
          onChange={(value:any) => actions.SRchangeStatus(value)}/>
          {roleViseItems()[0]?.key ==='pending' && selectedStatus == "pending"?
            <PendingSlik/>
          : 
            <NonPendingSlik/>
          }
        
      </ContentContainer>
    </div>
  )
} 

export default SlikRequests;