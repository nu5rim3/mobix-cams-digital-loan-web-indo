import { Button, Form, Grid, Input, Select, Space,  notification } from 'antd';
import React, {useEffect, useState} from 'react';
import Paragraph from 'antd/es/typography/Paragraph';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../services/Services';
import {InfoCircleOutlined} from '@ant-design/icons'
import BreadCrumbContainer from '../../components/Containers/BreadCrumbContainer';
import ContentContainer from '../../components/Containers/ContentContainer';
import Title from '../../components/Typography/Tytle';

export interface IUserFormProps {
}

export default function UserForm (props: IUserFormProps) {

    const [branch, setBranch] = useState([])
    const [role, setRole] = useState([])
    let { id } = useParams();
    const [addLoading, setAllLoading] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState<boolean>(false)
    const [showMeCode, setShowMeCode] = useState<boolean>(false)
    const navigate = useNavigate();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const [userDataLoading, setUserDataLoading] = useState(false)
    const [showDaLimit, setShowDaLimit] = useState(false)
    

    const [form] = Form.useForm();

    const getValues = async () => {
      try{
        const branches = await API.branchServices.getAllBranches()
        setBranch(branches.data)
  
        const roles = await API.roleServices.getAllRoles()
        setRole(roles.data)
  
        if(id){
          setUserDataLoading(true)
          const user = await API.userServices.getUserById(id)
          const roleCodes = user.data.roles?.map((role:any) => role.code)
          form.setFieldsValue({
            ...user.data,
            branch: user.data.branches?.[0].code,
            roles: roleCodes,
          })
          if(roleCodes?.includes('MFO')){
            setShowMeCode(true)
          }
          if(user.data.daLimit){
            setShowDaLimit(true)
          }
          setUserDataLoading(false)
        }
      }catch(err){
        console.log("err", err)
      }
    }

    useEffect(()=> {
      getValues()
    },[])

    const handleAddUser = async (e:any) => {
      setAllLoading(true)
      try{
        const data = {
          idx: id || e.userName,
          email: e.email,
          meCode: e.meCode,
          mobileNo: e.mobileNo,
          userName: e.userName,
          profileUser: e.profileUser,
          branches: [
            {
              code: e.branch
            }
          ],
           loginType: "IDS",
          roles: e.roles.map((role:string) => ({code : role})),

          // idx:"testing",
          // companyCode: "050",
          // isMobileRegistered: "Y",
          // status: "A",
          // loginType: "AD",
          // devices: [
          //   {
          //     code: "1231231",
          //     model: "samsung",
          //     issueDate: "2023-03-11",
          //     expireDate: "2024-03-11"
          //   }
          // ]
        }
  
        if(!id){
          const user = await API.userServices.addUser({
            ...data,
            password: e.password
          })
          notification.success({
            message: 'User has been created successfully'
          })
          navigate('/userManagement')
        }else{
          const user = await API.userServices.updateUser(data, id)
            notification.success({
              message: 'User has been updated successfully'
            })
            navigate('/userManagement')
        }
      }catch(error){
        if (axios.isAxiosError(error)) {
          const axiosError = error;
          // You can access error.response for details about the HTTP response, e.g., status code and data
          if (axiosError.response) {
            const { status, data } = axiosError.response;
            notification.error({
              message: data.message || 'An error occurred during the request.'
            })
          } else {
             // Set a generic network error message
            notification.error({
              message: 'An error occurred. Please try again later.'
            })  
          }
        } 
        else {
          // Handle non-Axios errors
          notification.error({
            message: 'There was an error processing your request.'
          })
        }
      }finally{
        setAllLoading(false)
      }
    }

    const verifyUserName = () => {
      form.validateFields(['userName'])
      .then(async () => {
        try{
          setVerifyLoading(true)
          const username = form.getFieldValue('userName')
          const getMarketeer = await API.marketeerServices.getMarketeersByUserName(username)
          form.setFieldsValue({
            branch: getMarketeer.data.mkexMeBranch,
            profileUser : getMarketeer.data.mkexName,
            meCode: getMarketeer.data.mkexCode,
            email: getMarketeer.data.syusMailO
          })
          if(getMarketeer.data.daLimit){
            setShowDaLimit(true)
          }
        }catch(error){
          // Check if the error is an AxiosError
          if (axios.isAxiosError(error)) {
            const axiosError = error;
            // You can access error.response for details about the HTTP response, e.g., status code and data
            if (axiosError.response) {
              const { status, data } = axiosError.response;
              notification.error({
                message: data.message || 'An error occurred during the request.'
              })
            } else {
               // Set a generic network error message
              notification.error({
                message: 'An error occurred. Please try again later.'
              })  
            }
          } 
          else {
            // Handle non-Axios errors
            notification.error({
              message: 'There was an error processing your request.'
            })
          }
        }
        finally{
          setVerifyLoading(false)
        }
      })
    }

  return (
    <div>
      <BreadCrumbContainer>
        <Paragraph className='m-0 p-0 ' style={{margin: 0, padding:0}}  type="secondary">Home</Paragraph>
        <Title 
          level={4}
          title='User Management'
        />
      </BreadCrumbContainer>

    <ContentContainer>
      <Title 
          style={{color: '#374957'}} 
          level={4}
          title='User Details'
      /> 
      <div
       className='border-l-current border-r-current'
      >
      <Form
            form={form}
            name="register"
            layout='vertical'
            scrollToFirstError
            onFinish={(e)=> handleAddUser(e)}
            onFieldsChange={(e:any)=> {
              if(e[0]?.name[0] == "roles"){
                if((e[0]?.value.includes('MFO'))){
                  setShowMeCode(true)
                }else{
                  setShowMeCode(false)
                }
              }
            }}
            wrapperCol={{ span: 20}}
            size={screens.xs? 'middle' :'large'}
      >
         <div className={
          screens.xs
          ? 'px-2'
          :'flex justify-between px-12'
          }>
          <Form.Item
            className={screens.xs? 'w-full' :'w-1/2'}
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              fontWeight: 600,
            }}
          >
              <Space.Compact style={{ width: '100%' }}>
                <Form.Item
                  name="userName"
                  noStyle
                  rules={[{ required: true, message: 'Username is required' }]}
                >
                  <Input/>
                </Form.Item>
                <Button 
                  type="primary"
                  onClick={verifyUserName}
                  loading={verifyLoading}
                >Verify</Button>
              </Space.Compact>
          </Form.Item>

          <Form.Item
            className={screens.xs? 'w-full' :'w-1/2'}
            name="branch"
            label="Branch"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              fontWeight: 600,
            }}
          >
            <Select
              showSearch
             >
              {branch?.map((option:any, index) => (
                <Select.Option
                    value={option.code}
                    key={index.toString()}
                >
                    {option.description}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
         </div>

         <div className={
          screens.xs
          ? 'px-2'
          :'flex justify-between px-12'
          }>
          <Form.Item
            className={screens.xs? 'w-full' :'w-1/2'}
            name="roles"
            label="User Role"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              fontWeight: 600,
            }}
          >
             <Select
              mode="multiple"
              showSearch
             >
              {role?.map((option:any, index) => (
                <Select.Option
                    value={option.code}
                    key={index.toString()}
                >
                    {option.description}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            className={screens.xs? 'w-full' :'w-1/2'}
            name="email"
            label="Email"
            required
            rules={
              [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                ({ getFieldValue }: any) => ({
                  async validator(_: any, value: any) {
                    const roles = getFieldValue('roles')
                    const isMFO = roles?.includes('MFO')

                    if(isMFO && roles.length == 1){
                      return Promise.resolve();
                    }else if(!value){
                      return Promise.reject(
                        new Error("Please input your E-mail!")
                      )
                    }
                  },
              })
              ]
              // [
              // {
              //   type: 'email',
              //   message: 'The input is not valid E-mail!',
              // },
              
              // ]
          }
            style={{
              fontWeight: 600,
            }}
          >
            <Input />
          </Form.Item>
         </div>

         <div className={
            screens.xs
            ? 'px-2'
            :'flex justify-between px-12'
          }>
          <Form.Item
            className={screens.xs? 'w-full' :'w-1/2'}
            name="profileUser"
            label="Full Name"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              fontWeight: 600,
            }}
          >
            <Input style={{margin: 0}}/>
          </Form.Item>

          <Form.Item
            className={screens.xs? 'w-full' :'w-1/2'}
            name="mobileNo"
            label="Contact"
            rules={[
              {
                required: true,
                max: 12,
                min: 11
              },
            ]}
            style={{
              fontWeight: 600,
            }}
          >
            <Input />
          </Form.Item>
         </div>

          {!id && 
            <div className={
              screens.xs
              ? 'px-2'
              :'flex justify-between px-12'
              }>
              <Form.Item
                  className={screens.xs? 'w-full' :'w-1/2'}
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        var pattern = new RegExp(
                          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
                        );

                        if (value && pattern.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(''));
                      },
                    }),
                  ]}
                  style={{
                    fontWeight: 600,
                    // height: 20
                  }}
                  hasFeedback
                  tooltip={{ title: 'Password should contain a digit[0-9], A lower case letter[a-z], An upper case letter[A-Z], one of !@#$%&* characters', icon: <InfoCircleOutlined /> }}
                >
                  <Input.Password style={{margin: 0}} autoComplete="off"/>
                </Form.Item>

              <Form.Item
                className={screens.xs? 'w-full' :'w-1/2'}
                name="confirmPassword"
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
                style={{
                  fontWeight: 600,
                  // height: 20
                }}
                hasFeedback
                dependencies={['password']}
              >
                <Input.Password style={{margin: 0}}/>
              </Form.Item>
            </div>
          }

            <div className={
              screens.xs
              ? 'px-2'
              :'flex justify-between px-12'
            }>
              {showMeCode &&
              <Form.Item
                // hidden={form.getFieldValue('roles')? true : false}
                className={screens.xs? 'w-full' :'w-1/2'}
                name="meCode"
                label="ME Code"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{
                  fontWeight: 600,
                  // height: 20
                }}
              >
                <Input style={{margin: 0}}/>
              </Form.Item>
              }

              {showDaLimit &&
                <Form.Item
                  // hidden={form.getFieldValue('roles')? true : false}
                  className={screens.xs? 'w-full' :'w-1/2'}
                  name="daLimit"
                  label="DA Limit"
                  style={{
                    fontWeight: 600,
                    // height: 20
                  }}
                >
                  <Input style={{margin: 0}} readOnly/>
                </Form.Item>
              }
            </div>
          
         {/* </Col> */}

         {/* <Form.Item 
        //  wrapperCol={{ span: 12, offset: 6 }}
            // className='bg-blue-100 items-center	'
         > */}
          {/* <Space className='flex justify-center p-10 bg-red-100 w-full'> */}
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
             <div className='flex justify-center p-10 w-full'>
                <Button htmlType="reset"
                  shape="round"
                  size='large'
                  className='mr-3'
                  >Reset</Button>
                <Button 
                  // onClick={() => {
                  //   // console.log("cli")
                  //   // navigate('/userManagement/createUser')

                  // }} 
                  htmlType="submit"
                  type='primary'
                  shape="round"
                  size='large'
                  loading={addLoading}
                //   icon={<PlusOutlined/>}
                >
                  {id?
                    'Update User'
                  : 'Create User'
                  }
                  
                </Button>

             </div>
          {/* </Space> */}
        {/* </Form.Item> */}
      </Form>
      </div>
    </ContentContainer>
  </div>
  );
}
