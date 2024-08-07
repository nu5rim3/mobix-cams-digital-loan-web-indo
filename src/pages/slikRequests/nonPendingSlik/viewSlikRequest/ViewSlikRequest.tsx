/* eslint-disable @typescript-eslint/no-unused-vars */
import Title from '../../../../components/Typography/Tytle';
import ContentContainer from '../../../../components/Containers/ContentContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { actions } from '../../../../store/store';
import { Button, Descriptions, Form, Space } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useSelector } from 'react-redux';
import formatAddress from '../../../../utils/getAddressByObjects';
import genarateSlikStatus from '../../../../utils/slikStatus';
import BreadCrumbContainer from '../../../../components/Containers/BreadCrumbContainer';
export interface IUpdateSlikRequestProps {
}

export default function UpdateSlikRequest(_props: IUpdateSlikRequestProps) {

  let { id } = useParams();
  const [form] = Form.useForm();
  const {
    initialData
  } = useSelector((state: any) => state.SlikRequest.slikUpdateUserData)

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
        status: initialData.status === 'C' ? null : initialData.status
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
      }),
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
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

  const slikItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Slik Status',
      children: genarateSlikStatus(initialData?.slkStatus),
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '2',
      label: 'KOL 1',
      children: initialData?.kol1,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '3',
      label: 'Other Active Facilities Count',
      children: initialData?.otherFacilityCount,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '4',
      label: 'KOL 2-5',
      children: initialData?.kol2_5,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '5',
      label: 'Total Plafon/ Total Loan Amounts',
      children: initialData?.totalLoanAmounts,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '6',
      label: 'Write Off',
      children: initialData?.writeOff,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '7',
      label: 'Total Outstanding',
      children: initialData?.totalOutstanding,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '8',
      label: 'LOVI',
      children: initialData?.lovi,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },
    {
      key: '9',
      label: 'Comment',
      children: initialData?.slkComment,
      labelStyle: {
        color: '#102C57',
        fontWeight: 600,
        width: '40%'
      }
    },

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





  return (
    <div>
      <BreadCrumbContainer>
        <Title
          level={4}
          title='Slik Requests'
        />
      </BreadCrumbContainer>

      <Space direction="vertical">

        <ContentContainer>
          <Descriptions
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

          <Descriptions
            title={
              <Title
                level={5}
                title='SLIK Request Update'
              />
            }
            column={
              2
            }
            items={slikItems}
            size='small'
          />
        </ContentContainer>
        <div className='flex justify-end mt-8'>
          <Button onClick={() => navigate(-1)} type='dashed'>Back</Button>
        </div>
      </Space>

    </div>
  );
}
