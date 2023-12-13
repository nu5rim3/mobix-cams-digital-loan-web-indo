import React, { useEffect, useState } from 'react';
import {Grid, Input, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons' 
import Paragraph from 'antd/es/typography/Paragraph';
import { useNavigate } from 'react-router-dom';
import { API } from '../../services/Services';
import Title from '../../components/Typography/Tytle';
import BreadCrumbContainer from '../../components/Containers/BreadCrumbContainer';
import ContentContainer from '../../components/Containers/ContentContainer';
import Search from '../../components/Search/Search';
import Button from '../../components/Buttons/Button';
import FPaginatedTable from '../../components/tables/FPaginatedTable';
import ResetPassword from './ResetPassword';


const UserManagement: React.FC = () =>{

  const navigate = useNavigate();
  const [users, setUsers] = useState<[]>([])
  const [usersLoading, setUsersLoading] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false)

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
        <>
          <Space size="middle" className='mr-5'>
            <a onClick={() => navigate(`/indo-digital-loan/userManagement/updateUser/${record.idx}`)}>Update {record.name}</a>
          </Space>
          
          <Space size="middle">
            <a onClick={() => setOpenPasswordModal(true)}>Change Password {record.name}</a>
          </Space>
        </>
      ),
    },
  ];

  return (
    <div>
      <BreadCrumbContainer>
        <Paragraph className='m-0 p-0 ' style={{margin: 0, padding:0}}  type="secondary">Home</Paragraph>
        <Title 
          level={4}
          title='User Management'
        />
      </BreadCrumbContainer>
      <ResetPassword open={openPasswordModal} setOpen={setOpenPasswordModal}/>

      <ContentContainer >
            <Title 
              style={{color: '#374957'}} 
              level={4}
              title='User Details'
            /> 
          <div className='flex items-center justify-between'>
            <div className=' w-1/2'>
            <Title 
              style={{margin: 1}} 
              level={5}
              title='Search Items'
            />
            <Search
              onChange={(value:any) => setSearchText(value)}
              className='w-full pb-3'
            />
          </div>
          <div>
            <Button 
              onClick={() => {
                navigate('/indo-digital-loan/userManagement/createUser')
              }} 
              type='primary'
              shape="round"
              size={'large'}
              // icon={<PlusOutlined/>}
              label="Create New User"
            />
          </div>
        </div>

        <div
         className='border-l-current border-r-current'
        >
          <FPaginatedTable 
            loading={usersLoading}
            rowKey={'idx'}
            columns={columns} 
            dataSource={users || []}
          />
        </div>

        <div className='flex justify-center p-10'>
         
        </div>
      </ContentContainer>
    </div>
  )
} 

export default UserManagement;