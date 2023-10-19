import * as React from 'react';
import BreadCrumbContainer from '../../../../components/Containers/BreadCrumbContainer';
import Title from '../../../../components/Typography/Tytle';
import ContentContainer from '../../../../components/Containers/ContentContainer';
import Paragraph from 'antd/es/typography/Paragraph';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { actions } from '../../../../store/store';
import { Button, Descriptions, Form, Grid, Input, Select, Space } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useSelector } from 'react-redux';

export interface IUpdateSlikRequestProps {
}

export default function UpdateSlikRequest (props: IUpdateSlikRequestProps) {

  let { id } = useParams();
  const [form] = Form.useForm();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const {
    initialData
  } = useSelector((state: any) => state.SlikRequest.slikUpdateUserData)

  const getSlikRequestData = () => {
    if(id){
      actions.getSlikRequestData(id)
    }
  } 

  useEffect(() => {
    getSlikRequestData()
  },[id])

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Center',
      children: initialData?.centerCode,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '1',
      label: 'Residence Address',
      children: '-',
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '2',
      label: 'Group No',
      children: initialData?.groupIdx,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '1',
      label: 'DP Name & Relathionship',
      children: '-',
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '3',
      label: 'Customer Name',
      children: initialData?.customerName,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '1',
      label: 'Contact Number',
      children: '-',
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '4',
      label: 'NIK',
      children: initialData?.customerKTP,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '1',
      label: 'Batch No',
      children: initialData?.batchNumber,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '5',
      label: 'Family Contact Number',
      children: '-',
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },{
      key: '5',
      label: '',
      children: '',
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
  ];
  
  return (
    <div>
      <BreadCrumbContainer>
        <Paragraph className='m-0 p-0 ' style={{margin: 0, padding:0}}  type="secondary">Home</Paragraph>
        <Title 
          level={4}
          title='Slik Requests'
        />
      </BreadCrumbContainer>

    <Space direction="vertical">

      <ContentContainer>
          <Descriptions 
            // bordered
            title={
              <Title 
                  level={5}
                  title='Slik Request Details'
              /> 
            }
            column={
              2
            }
            items={items} 
            size='small'
          />
      </ContentContainer>
      <ContentContainer>
        <Title 
            level={5}
            title='SLIK Request Update'
        /> 
        <div
        className='border-l-current border-r-current mt-5'
        >
        <Form
              form={form}
              name="slikUpdate"
              layout='vertical'
              scrollToFirstError
              // onFinish={(e)=> handleAddUser(e)}
              // onFieldsChange={(e:any)=> {
              //   if(e[0]?.name[0] == "roles"){
              //     if((e[0]?.value.includes('MFO') || e[0]?.value.includes('CSA'))){
              //       setShowMeCode(true)
              //     }else{
              //       setShowMeCode(false)
              //     }
              //   }
              // }}
              wrapperCol={{ span: 20}}
              // size={screens.xs? 'middle' :'large'}
        >
          <div className={
            screens.xs
            ? 'px-2'
            :'flex justify-between px-12'
            }>

            <Form.Item
              className={screens.xs? 'w-full' :'w-1/2'}
              name="status"
              label="Recommendation"
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
                {[
                  {
                    code: 'Ok',
                    description: 'Ok',
                  },
                  {
                    code: 'Claimable',
                    description: 'Claimable',
                  },
                  {
                    code: 'Not Ok',
                    description: 'Not Ok',
                  },
                ]?.map((option:any, index) => (
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
              label="KOL 1"
              style={{
                fontWeight: 600,
              }}
            >
                    <Input/>
            </Form.Item>

          </div>

          <div className={
            screens.xs
            ? 'px-2'
            :'flex justify-between px-12'
            }>
            <Form.Item
              className={screens.xs? 'w-full' :'w-1/2'}
              name="other"
              label="Other Active Facilities Count"
              style={{
                fontWeight: 600,
              }}
            >
               <Input type='number'/>
            </Form.Item>

            <Form.Item
              className={screens.xs? 'w-full' :'w-1/2'}
              name="kol-2-5"
              label="KOL 2-5"
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
              label="Total Plafon/ Total Loan Amounts"
              style={{
                fontWeight: 600,
              }}
            >
              <Input style={{margin: 0}} type='number'/>
            </Form.Item>

            <Form.Item
              className={screens.xs? 'w-full' :'w-1/2'}
              name="mobileNo"
              label="Write Off"
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
                name="totalout"
                label="Total Outstanding"
                style={{
                  fontWeight: 600,
                }} >
                <Input style={{margin: 0}}/>
              </Form.Item>

            <Form.Item
              className={screens.xs? 'w-full' :'w-1/2'}
              name="lov1"
              label="LOVI"
              style={{
                fontWeight: 600,
                // height: 20
              }}
            >
              <Input style={{margin: 0}}/>
            </Form.Item>
          </div>

          <div className='flex justify-center p-10 w-full'>
              <Button htmlType="reset"
                shape="round"
                size='large'
                className='mr-3'
                >Reset</Button>
              <Button 
                onClick={() => {
                  // console.log("cli")
                  // navigate('/userManagement/createUser')
                  
                }} 
                htmlType="submit"
                type='primary'
                shape="round"
                size='large'
                // loading={addLoading}
              //   icon={<PlusOutlined/>}
              >
                Save
              </Button>

          </div>
        </Form>
        </div>
      </ContentContainer>
    </Space>

  </div>
  );
}
