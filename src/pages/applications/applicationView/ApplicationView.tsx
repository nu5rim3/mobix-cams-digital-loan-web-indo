import React, {Children, useEffect, useState} from 'react';
import BreadCrumbContainer from '../../../components/Containers/BreadCrumbContainer';
import Title from '../../../components/Typography/Tytle';
import Paragraph from 'antd/es/typography/Paragraph';
import ContentContainer from '../../../components/Containers/ContentContainer';
import { Collapse, CollapseProps, Table, Tag, UploadFile } from 'antd';
import OnboardingView from './Blockes/Onboarding';
import { useSelector } from 'react-redux';
import { actions } from '../../../store/store';
import { useParams } from 'react-router-dom';
import CustomerDetailsView from './Blockes/CustomerDetailsView';
import GuarantorDetails from './Blockes/GuarantorDetails';
import CollateralDetails from './Blockes/CollateralDetails';
import CashFlowDetails from './Blockes/CashFlowDetails';
import Images from './Blockes/Images';
import Achnowledgement from './Blockes/Achnowledgement';
import Approval from './Blockes/Approval';
import ImageUpload from './Blockes/ImageUpload';
import ApprovalEnd from './Blockes/ApprovalEnd';
import FinancialApproval from './Blockes/FinancialApproval';

export interface IApplicationViewProps {
}

interface CollapseContainerProps {
    label : string,
    children : React.ReactNode
}

export const CollapseContainer: React.FC<CollapseContainerProps> = ({
    label,
    children
}) => {
    return  <Collapse 
        expandIconPosition={'end'}
        defaultActiveKey={['1']} 
        style={{
            fontWeight: 600,
            marginTop: '12px'
        }}
        items={[
            {
                key: '1',
                label: label,
                children: children,
              },
        ]} 
        // items={getItems(panelStyle)}
    />
}

export default function ApplicationView (props: IApplicationViewProps) {

    const customerData = useSelector((state: any) => state.Application.customerData)
    let { id } = useParams();
    let fileList 

    const setFiles = (newData:any) => {
        console.log("calling", newData)
        fileList = newData
    }

    const items = [
        {
            label: 'Onboarding Details',
            children: <OnboardingView/>,
        },
        {
            label: 'Financial Approval',
            children: <FinancialApproval/>,
        },
        {
            label: 'Customer Details',
            children: <CustomerDetailsView/>,
        },
        {
            label: 'Guarantor Details',
            children: <GuarantorDetails/>,
        },
        {
            label: 'Collateral Details',
            children: <CollateralDetails/>,
        },
        {
            label: 'Cash Flow Details',
            children: <CashFlowDetails/>,
        },
        {
            label: 'Images',
            children: <Images/>,
        },
        // {
        //     label: 'Image Upload',
        //     children: <ImageUpload 
        //     setFiles={setFiles} 
        //     // setFileList={setFileList}
        //     />,
        // },
        // {
        //     label: 'Customer Achnowledgement',
        //     children: <Achnowledgement/>,
        // },
        // {
        //     label: 'Approval',
        //     children: <Approval fileList={fileList}/>,
        // },
      ];

    useEffect(() => {
        if(id){
            actions.getCustomerData(id)
            actions.getCustomerContactData(id)
            actions.getCustomerAddressData(id)
            actions.getBusinessData(id)
            actions.getSpouseData(id)
            actions.getGuarantorDetails(id)
            actions.getCollateralDetails(id)
            actions.getCashFlowDetails(id)
            actions.getImageDetails(id)
            actions.getApprovalStepsDetails(id)
            actions.getFinanceDetails(id)
        }
    },[])

  
      

  return (
    <div>
      <BreadCrumbContainer>
        <Paragraph className='m-0 p-0 ' style={{margin: 0, padding:0}}  type="secondary">Home</Paragraph>
        <Title 
          level={4}
          title='Application Details'
        />
      </BreadCrumbContainer>

      <ContentContainer>
        <Title 
            style={{margin: 1}} 
            level={5}
            title='Customer Details'
        />

        <div className='mt-3'>
            <Table
                loading={customerData.fetching}
                rowKey={'appraisalId'}
                size='small'
                columns={[
                    {
                        title: 'LEAD ID',
                        dataIndex: 'appraisalId',
                        key: 'appraisalId',
                    },
                    {
                        title: 'User Name',
                        dataIndex: 'fullName',
                        key: 'fullName',
                    },{
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (_, record) => (
                        <>
                            {record?.status === "A" 
                            ? <Tag color='green' key={record?.status}>
                                Active
                            </Tag>
                            :<Tag color='green' key={record?.status}>
                            Active
                            </Tag>
                            }
                        </>
                    ),
                    },
                ]}
                dataSource={customerData.data? [customerData.data] : []}
                pagination={false}
            />

        </div>
        {/* <Collapse items={items} defaultActiveKey={['1']} onChange={() => console.log("ghello")} />; */}

      </ContentContainer>

        <div className='mt-3'>
            <ContentContainer>
                <Title 
                    style={{margin: 1}} 
                    level={5}
                    title='Application Details'
                />
                
                <div className='mt-5'>

                    {items.map((row, index) => {
                        return <CollapseContainer
                            key={index}
                            label={row.label}
                            children={row.children}
                        />
                    })}

                </div>
            </ContentContainer>

            <ApprovalEnd/>
            {/* <CollapseContainer
                key={'approval'}
                label={row.label}
                children={row.children}
            /> */}
        </div>
    </div>
  );
}
