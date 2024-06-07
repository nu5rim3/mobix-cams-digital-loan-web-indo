import React from 'react';
import Paragraph from 'antd/es/typography/Paragraph';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useSelector } from 'react-redux';
import { actions } from '../../store/store';
import BreadCrumbContainer from '../../components/Containers/BreadCrumbContainer';
import Title from '../../components/Typography/Tytle';
import ContentContainer from '../../components/Containers/ContentContainer';
import NonPendingSlik from './nonPendingSlik/NonPendingSlik';
import PendingSlik from './pendingSlik/PendingSlik';


const SlikRequests: React.FC = () => {


  const selectedStatus = useSelector((state: any) => state.SlikRequest.selectedStatus)
  const { selectedRole } = useSelector((state: any) => state.AppData)

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

  const roleViseItems = () => {
    return selectedRole.includes('ADMIN') ?
      itemsThree
      : selectedRole.includes('CSA') ?
        itemsTwo
        : selectedRole.includes('SLIKU') ?
          itemsOne
          : itemsOne

  }

  return (
    <div>
      <BreadCrumbContainer>
        <Paragraph className='m-0 p-0 ' style={{ margin: 0, padding: 0 }} type="secondary">Home</Paragraph>
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
          onChange={(value: any) => actions.SRchangeStatus(value)} />
        {roleViseItems()[0]?.key === 'pending' && selectedStatus == "pending" ?
          <PendingSlik />
          :
          <NonPendingSlik />
        }

      </ContentContainer>
    </div>
  )
}

export default SlikRequests;