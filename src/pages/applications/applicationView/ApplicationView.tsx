/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import BreadCrumbContainer from '../../../components/Containers/BreadCrumbContainer';
import Title from '../../../components/Typography/Tytle';
import ContentContainer from '../../../components/Containers/ContentContainer';
import { Collapse, Table, Tag } from 'antd';
import OnboardingView from './Blockes/Onboarding';
import { useSelector } from 'react-redux';
import { actions } from '../../../store/store';
import { useParams } from 'react-router-dom';
import CustomerDetailsView from './Blockes/CustomerDetailsView';
import GuarantorDetails from './Blockes/GuarantorDetails';
import CollateralDetails from './Blockes/CollateralDetails';
import CashFlowDetails from './Blockes/CashFlowDetails';
import Images from './Blockes/Images';
import ApprovalEnd from './Blockes/ApprovalEnd';
import FinancialApproval from './Blockes/FinancialApproval';

export interface IApplicationViewProps {
}

interface CollapseContainerProps {
    label: string,
    children: React.ReactNode
}

export const CollapseContainer: React.FC<CollapseContainerProps> = ({
    label,
    children
}) => {
    return <Collapse
        accordion
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
    />
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ApplicationView(_props: IApplicationViewProps) {

    const customerData = useSelector((state: any) => state.Application.customerData)
    const { userData } = useSelector((state: any) => state.AppData)
    const { id } = useParams();

    const items = [
        {
            label: 'Onboarding Details',
            children: <OnboardingView />,
        },
        {
            label: 'Financial Approval',
            children: <FinancialApproval />,
        },
        {
            label: 'Customer Details',
            children: <CustomerDetailsView />,
        },
        {
            label: 'Guarantor Details',
            children: <GuarantorDetails />,
        },
        {
            label: 'Collateral Details',
            children: <CollateralDetails />,
        },
        {
            label: 'Cash Flow Details',
            children: <CashFlowDetails />,
        },
        {
            label: 'Images',
            children: <Images />,
        },
    ];

    useEffect(() => {
        if (id) {
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
            actions.getFinanceDetails({ arg: id, idx: userData?.data?.idx })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <BreadCrumbContainer>
                <Title
                    level={4}
                    title='Application Details'
                />
            </BreadCrumbContainer>

            <ContentContainer>
                <Title
                    style={{ margin: 1 }}
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
                                title: 'Customer Name',
                                dataIndex: 'fullName',
                                key: 'fullName',
                            }, {
                                title: 'Status',
                                dataIndex: 'status',
                                key: 'status',
                                render: (_, record) => (
                                    <>
                                        {record?.status === "A"
                                            ? <Tag color='green' key={record?.status}>
                                                Active
                                            </Tag>
                                            : <Tag color='green' key={record?.status}>
                                                Active
                                            </Tag>
                                        }
                                    </>
                                ),
                            },
                        ]}
                        dataSource={customerData.data ? [customerData.data] : []}
                        pagination={false}
                    />

                </div>

            </ContentContainer>

            <div className='mt-3'>
                {/* <ContentContainer>
                    <Title
                        style={{ margin: 1 }}
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
                </ContentContainer> */}

                <Collapse defaultActiveKey={['0']} items={items} expandIconPosition='end' style={{
                    fontWeight: 600,
                }} />
                <ApprovalEnd />
            </div>
        </div>
    );
}
