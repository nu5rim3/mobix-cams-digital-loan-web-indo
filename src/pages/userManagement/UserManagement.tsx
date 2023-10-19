import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Space, Table, Tag, theme, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons' 
import Paragraph from 'antd/es/typography/Paragraph';
import { useNavigate } from 'react-router-dom';
import { API } from '../../services/Services';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const UserManagement: React.FC = () =>{

  const {
    token: { colorBgContainer, boxShadow, colorBgLayout, colorBgElevated , borderRadiusOuter},
  } = theme.useToken();
  const navigate = useNavigate();
  const [users, setUsers] = useState<[]>([])
  const [usersLoading, setUsersLoading] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const { Title } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  useEffect(() => {
    getCall()
  }, [])

  const getCall = async () => {
    try{
      setUsersLoading(true)
      const users = await API.userServices.getAllUsers()
      setUsers(users.data.content)
    }catch(e){

    }
    finally{
      setUsersLoading(false)
    }

  }

  const columns: ColumnsType<any> = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record.userName.toLowerCase().includes(typeof(value) == 'string'? value.toLowerCase(): value)
      }
    },
    {
      title: 'Full Name',
      dataIndex: 'profileUser',
      key: 'profileUser',
    },
    {
      title: 'Branch',
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
      title: 'User Role',
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
      title: 'Status',
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
          <a onClick={() => navigate(`/userManagement/updateUser/${record.idx}`)}>Update {record.name}</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className='h-12'>
        Testing Round
      </div>

      <div 
        style={{
          width: '100%',
          overflow: 'auto',
          backgroundColor: colorBgContainer,
          borderRadius: borderRadiusOuter
        }}
        className={screens.xs? 'p-2': 'p-3'}
      >
        <Title className='m-0 p-0 ' style={{margin: 0}} level={screens.xs? 4 : 3}>User Details</Title>
        <Paragraph className='m-0 p-0 ' type="secondary">Select an exsisting details</Paragraph>
          <Title className='m-0 p-0 ' style={{margin: 1}} level={5}>Search Items</Title>
          <div className={
            screens.xs
            ? 'pb-3 flex w-3/4'
            : 'pb-3 flex w-1/4'
            }> 
            <Input size="large" placeholder=" Search" prefix={<SearchOutlined />} onChange={(e) => setSearchText(e.target.value)}/>
          </div>
        <div
         className='border-l-current border-r-current'
        >
          <Table 
            loading={usersLoading}
            rowKey={'idx'}
            columns={columns} 
            dataSource={users || []}
            size={screens.xs? 'small' :'middle'}
          />
        </div>

        <div className='flex justify-center p-10'>
          <Button 
            onClick={() => {
              navigate('/userManagement/createUser')
            }} 
            type='primary'
            shape="round"
            size='large'
            icon={<PlusOutlined/>}
          >
            Create New User
          </Button>
        </div>
      </div>
    </div>
  )
} 

export default UserManagement;