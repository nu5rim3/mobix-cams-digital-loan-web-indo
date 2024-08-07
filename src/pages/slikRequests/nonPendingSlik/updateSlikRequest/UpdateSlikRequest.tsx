import React, { useState } from 'react';
import BreadCrumbContainer from '../../../../components/Containers/BreadCrumbContainer';
import Title from '../../../../components/Typography/Tytle';
import ContentContainer from '../../../../components/Containers/ContentContainer';
import Paragraph from 'antd/es/typography/Paragraph';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { actions } from '../../../../store/store';
import { Button, Descriptions, Form, Grid, Input, InputNumber, Select, Space, notification } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useSelector } from 'react-redux';
import { API } from '../../../../services/Services';
import axios from 'axios';
import formatAddress from '../../../../utils/getAddressByObjects';

export interface IUpdateSlikRequestProps {
}

export default function UpdateSlikRequest(props: IUpdateSlikRequestProps) {

  let { id } = useParams();
  const [form] = Form.useForm();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [addLoading, setAllLoading] = useState(false)
  const {
    initialData
  } = useSelector((state: any) => state.SlikRequest.slikUpdateUserData)
  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)

  const navigate = useNavigate();

  const getSlikRequestData = () => {
    if (id) {
      actions.getSlikRequestData(id)
    }
  }

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        status: initialData.status === 'INPG' ? null : initialData.status
      })
    }
  }, [initialData])

  useEffect(() => {
    getSlikRequestData()
  }, [id])

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Center',
      children: initialData?.fusionCenterCode,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '3',
      label: 'Group No',
      children: initialData?.groupIdx,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '5',
      label: 'Customer Name',
      children: initialData?.customerName,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '7',
      label: 'NIK',
      children: initialData?.customerKTP,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '8',
      label: 'Batch No',
      children: initialData?.batchNumber,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '2',
      label: 'Residence Address',
      children: formatAddress({
        address1: initialData?.addLine1,
        address2: initialData?.addLine2,
        address3: initialData?.addLine3,
        // address4 :initialData.address4
      }),
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    // {
    //   key: '4',
    //   label: 'DP Name & Relathionship',
    //   children: '-',
    //   labelStyle: {
    //     color: '#102C57',
    //     fontWeight: 600,
    //     width: '40%'
    //   }
    // },
    {
      key: '6',
      label: 'Contact Number',
      children: initialData?.cltContact1,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    // {
    //   key: '9',
    //   label: 'Family Contact Number',
    //   children: '-',
    //   labelStyle: {
    //     color: '#102C57',
    //     fontWeight: 600,
    //     width: '40%'
    //   }
    // },
    {
      key: '10',
      label: '',
      children: '',
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
  ];

  const saveSlickRequest = async (e: any) => {
    try {
      setAllLoading(true)
      const data = {
        slkIdx: id,
        appraisalId: initialData.appraisalId,
        batchNumber: initialData.batchNumber,
        customerName: initialData.customerName,
        customerKTP: initialData.customerKTP,
        slkStatus: e.status,
        status: initialData.status,
        callVerStatus: initialData.callVerStatus,
        appraisalType: initialData.appraisalType,
        centerCode: initialData.centerCode,
        fusionCenterCode: initialData.fusionCenterCode,
        groupIdx: initialData.groupIdx,
        kol1: e.kol1,
        kol2_5: e['kol-2-5'],
        otherFacilityCount: e.otherFacilityCount,
        totalLoanAmounts: e.totalLoanAmounts,
        writeOff: e.writeOff,
        totalOutstanding: e.totalOutstanding,
        lovi: e.lovi,
        slkComment: e.comment
      }

      if (id) {
        const user = await API.slikServices.updateSlik({ slikId: id, data: data })
        notification.success({
          message: 'Slik request updated successfully'
        })
        navigate('/indo-digital-loan/auth/slikRequest')
      }
    }
    catch (error) {
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
    finally {
      setAllLoading(false)
    }

  }

  return (
    <div>
      <BreadCrumbContainer>
        <Paragraph className='m-0 p-0 ' style={{ margin: 0, padding: 0 }} type="secondary">Home</Paragraph>
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
              onFinish={(e) => saveSlickRequest(e)}
            >
              <div className='grid grid-cols-2 gap-3'>
                <Form.Item
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
                        code: 'OK',
                        description: 'Ok',
                      },
                      {
                        code: 'C',
                        description: 'Claimable',
                      },
                      {
                        code: 'NOT_OK',
                        description: 'Not Ok',
                      },
                    ]?.map((option: any, index) => (
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
                  // className={}
                  label="KOL 1"
                  name='kol1'
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="otherFacilityCount"
                  label="Other Active Facilities Count"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <Input type='number' />
                </Form.Item>

                <Form.Item
                  name="kol-2-5"
                  label="KOL 2-5"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="totalLoanAmounts"
                  label="Total Plafon/ Total Loan Amounts"
                  style={{
                    fontWeight: 600,
                  }}

                >
                  <InputNumber
                    style={{ margin: 0 }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    className='w-full'
                  />
                </Form.Item>

                <Form.Item
                  name="writeOff"
                  label="Write Off"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="totalOutstanding"
                  label="Total Outstanding"
                  style={{
                    fontWeight: 600,
                  }} >
                  <InputNumber
                    className='w-full'
                    // width={200}
                    style={{ margin: 0 }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  />
                </Form.Item>

                <Form.Item
                  name="lovi"
                  label="LOVI"
                  style={{
                    fontWeight: 600,
                    // height: 20
                  }}
                >
                  <Input style={{ margin: 0 }} />
                </Form.Item>

                <Form.Item
                  name="comment"
                  label="Comment"
                  style={{
                    fontWeight: 600,
                  }} >

                  <Input.TextArea style={{ margin: 0 }} />
                </Form.Item>
              </div>

              <div className='flex justify-center w-full gap-3 mt-10'>
                <Button
                  type='dashed'
                  onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button htmlType="reset"
                  // shape="round"
                  size='middle'
                >Reset</Button>
                <Button
                  htmlType="submit"
                  type='primary'
                  // shape="round"
                  size='middle'
                  loading={addLoading}
                  disabled={selectedRole === 'ADMIN'}
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
