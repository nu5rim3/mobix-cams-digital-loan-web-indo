/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
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

    switch (true) {
      case selectedRole.includes('ADMIN'):
        return itemsThree;
      case selectedRole.includes('CSA'):
        return itemsTwo;
      case selectedRole.includes('SLIKU'):
        return itemsOne;
      default:
        return itemsOne;
    }
  }

  return (
    <div>
      <BreadCrumbContainer>
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