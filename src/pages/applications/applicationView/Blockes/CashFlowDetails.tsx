import * as React from 'react';
import { useSelector } from 'react-redux';
import Title from '../../../../components/Typography/Tytle';
import { Descriptions, DescriptionsProps, Divider, Spin } from 'antd';
import getCurrency from '../../../../utils/getCurrency';
import Paragraph from 'antd/es/typography/Paragraph';

export interface ICashFlowDetailsProps {
}

const itemsSalesOperation: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'businessDayPerMonth',
        label: 'Business Day per Month',
        children: (data.businessDayPerMonth),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'revenueInLowSessionDay',
        label: 'Revenue in Low Session Day',
        children: getCurrency(data.revenueInLowSessionDay),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'revenuePerMonth',
        label: 'Revenue per Month',
        children: getCurrency(data.revenuePerMonth),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'revenueInBusyDay',
        label: 'Revenue in Busy Day',
        children: getCurrency(data.revenueInBusyDay),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'ex1',
        label: '',
        children:''
    },
]

const itemsSalesRevenue3Day: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'revenueOneDayBefore',
        label: 'Revenue 1 Day Before',
        children: getCurrency(data.revenueOneDayBefore),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'revenueTwoDaysBefore',
        label: 'Revenue 2 Days Before',
        children: getCurrency(data.revenueTwoDaysBefore),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'revenueThreeDaysBefore',
        label: 'Revenue 3 Days Before',
        children: getCurrency(data.revenueThreeDaysBefore),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'averagePerDay',
        label: 'Average per Day',
        children: getCurrency(data.averagePerDay),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'ex1',
        label: '',
        children:''
    },
]

const itemsSalesRevenueCash: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'numberOfBusinessHoursPerDay',
        label: 'Business Hours per Day',
        children: data.numberOfBusinessHoursPerDay,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'currentTime',
        label: 'Current Time',
        children: data.currentTime,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'hoursAlreadyOpenToday',
        label: 'Hours Already Spent',
        children: data.hoursAlreadyOpenToday,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'cashWhenOpenToday',
        label: 'Opening Amount',
        children: getCurrency(data.cashWhenOpenToday),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'cashNow',
        label: 'Current Amount',
        children: getCurrency(data.cashNow),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'moneyForPurchasingToday',
        label: 'Purchase Amount',
        children: getCurrency(data.moneyForPurchasingToday),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'incomeToday',
        label: 'Today Income',
        children: getCurrency(data.incomeToday),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'incomePerBusinessHour',
        label: 'Income per Business Hour',
        children: getCurrency(data.incomePerBusinessHour),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'estimatedIncomePerDay',
        label: 'Estimated Income per Day',
        children: getCurrency(data.estimatedIncomePerDay),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'estimatedIncomePerMonth',
        label: 'Estimated Income per Month',
        children: getCurrency(data.estimatedIncomePerMonth),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'ex1',
        label: '',
        children:''
    },
]


const itemsGrossRevenue: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'grossRevenuePerMonth',
        label: 'Total Sales Revenue',
        children: getCurrency(data.grossRevenuePerMonth),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'totalOtherIncome',
        label: 'Other Income',
        children: getCurrency(data.totalOtherIncome),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'ex1',
        label: '',
        children:''
    },
]

const itemsBusinussStock: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'stockName',
        label: 'Stock Name',
        children: data.stockName,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'purchasingPrice',
        label: 'Purchasing Price',
        children: getCurrency(data.purchasingPrice),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }
    ,{
        key: 'ex1',
        label: '',
        children:''
    }
]

const itemsOtherIncome: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'source',
        label: 'Source',
        children: data.source,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'amount',
        label: 'Amount',
        children: getCurrency(data.amount),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }
]

const itemsTotalExpenseB: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'transportationExpense',
        label: 'Transportation',
        children: getCurrency(data.transportationExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'utilitiesExpense',
        label: 'Utility',
        children: getCurrency(data.utilitiesExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'rentExpense',
        label: 'Rent',
        children: getCurrency(data.rentExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'employeeSalaryExpense',
        label: 'Employee Salary',
        children: getCurrency(data.employeeSalaryExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'otherExpense',
        label: 'Other',
        children: getCurrency(data.otherExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'ex1',
        label: '',
        children:''
    },
]

const itemsTotalExpenseH: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'foodExpense',
        label: 'Food',
        children: getCurrency(data.foodExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'transportationExpense',
        label: 'Transport',
        children: getCurrency(data.transportationExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'utilitiesExpense',
        label: 'Utility',
        children: getCurrency(data.utilitiesExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'educationExpense',
        label: 'Education',
        children: getCurrency(data.educationExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'socialContributionExpense',
        label: 'Social Contribution',
        children: getCurrency(data.socialContributionExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'healthExpense',
        label: 'Health',
        children: getCurrency(data.healthExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'loanPaymentsExpense',
        label: 'Loan Payments',
        children: getCurrency(data.loanPaymentsExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'otherExpense',
        label: 'Other',
        children: getCurrency(data.otherExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },{
        key: 'ex1',
        label: '',
        children:''
    },
]


const itemsSummary: (data: any) => DescriptionsProps['items'] = (data) => [
    {
        key: 'maximumMonthlyInstallment',
        label: 'Maximum Monthly Installment',
        children: getCurrency(data.maximumMonthlyInstallment),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '60%'
        }
    },{
        key: 'maximumWeeklyInstallment',
        label: 'Maximum Weekly Installment',
        children: getCurrency(data.maximumWeeklyInstallment),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '60%'
        }
    },{
        key: 'netIncomePerMonth',
        label: 'Net Income per Month',
        children: getCurrency(data.netIncomePerMonth),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '60%'
        }
    },{
        key: 'netIncomePerWeek',
        label: 'Net Income per Week',
        children: getCurrency(data.netIncomePerWeek),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '60%'
        }
    },{
        key: 'totalExpensesPerMonth',
        label: 'Total Expenses per Month',
        children: getCurrency(data.totalExpensesPerMonth),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '60%'
        }
    },{
        key: 'ex1',
        label: '',
        children:''
    },
]

export default function CashFlowDetails (props: ICashFlowDetailsProps) {

    const {
        cashFlowDetails
    } = useSelector((state: any) => state.Application)
    
  return (
    <div
        style={{
            fontWeight: 300
        }}
    >
        {
            cashFlowDetails.fetching?
                <div className='w-full h-32 flex justify-center'>
                    <Spin/>
                </div>
            :
            <div>
                <Title 
                    level={5}
                    title='Sales/Operations Revenue'
                    style={{color: '#7C3626'}} 
                />
                <div className='mt-4'>
                    <Descriptions 
                        column={
                        3
                        }
                        items={cashFlowDetails.data?.salesOperatingRevenueDto
                            ? itemsSalesOperation(cashFlowDetails.data?.salesOperatingRevenueDto): []} 
                        size='small'
                    />  
                </div>

                <Divider/>

                <Title 
                    level={5}
                    title='Sales Revenue (3 Days Cross Check)'
                    style={{color: '#7C3626'}} 
                />
                <div className='mt-4'>
                    <Descriptions 
                        column={
                        3
                        }
                        items={cashFlowDetails.data?.salesThreeDayCroscheckRevenueDto
                            ? itemsSalesRevenue3Day(cashFlowDetails.data?.salesThreeDayCroscheckRevenueDto): []} 
                        size='small'
                    />  
                </div>

                <Divider/>

                <Title 
                    level={5}
                    title='Sales Revenue (Cash Cross Check)'
                    style={{color: '#7C3626'}} 
                />
                <div className='mt-4'>
                    <Descriptions 
                        column={
                        3
                        }
                        items={cashFlowDetails.data?.salesCashCroscheckRevenueDto
                            ? itemsSalesRevenueCash(cashFlowDetails.data?.salesCashCroscheckRevenueDto): []} 
                        size='small'
                    />  
                </div>

                <Divider/>

                {/* other incomes */}
                <Title 
                    level={5}
                    title='Total Other Income'
                    style={{color: '#7C3626'}} 
                />

                <div className='grid grid-cols-4 gap-5 pt-2'>
                    {cashFlowDetails.data?.otherIncomeWrapperDto?.otherIncomeDtoList?.map((stock:any, index: any) => {
                        return  <div 
                                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                className='px-5 pt-5 rounded-md  font-sans my-4'
                                key={index}
                            >
                            <Descriptions 
                            key={index}
                            column={
                            1
                            }
                            items={stock? itemsOtherIncome(stock): []} 
                            size='small'
                        />  

                        </div>
                    })}
                </div>

                <div className='mt-5'>
                    <Descriptions 
                        key={'totalOtherIncome'}
                        column={
                        3
                        }
                        items={[
                            {
                                key: 'totalOtherIncome',
                                label: 'Total Other Income',
                                children: <div className='font-bold'>
                                    {getCurrency(cashFlowDetails.data?.otherIncomeWrapperDto?.totalOtherIncome)}
                                </div>,
                                labelStyle: {
                                    color: '#102C57',
                                    fontWeight: 600,
                                    width: '50%'
                                }
                            },
                            {
                                key: 'ex1',
                                label: '',
                                children:''
                            },
                            {
                                key: 'ex2',
                                label: '',
                                children:''
                            }
                        ]} 
                        size='small'
                    />  
                </div>

                <Divider/>

                <Title 
                    level={5}
                    title='Gross Revenue per month'
                    style={{color: '#7C3626'}} 
                />

                <div className='mt-4'>
                    <Descriptions 
                        column={
                        3
                        }
                        items={cashFlowDetails.data?.salesCashCroscheckRevenueDto
                            ? itemsGrossRevenue({
                                ...cashFlowDetails.data?.cashFlowFinalSummaryDto,
                                ...cashFlowDetails.data?.otherIncomeWrapperDto
                            }): []} 
                        size='small'
                    />     
                </div>

                <Divider/>

                <Title 
                    level={5}
                    title='Total Expenses per month'
                    style={{color: '#7C3626'}} 
                />

                <div className='grid grid-cols-4 gap-5 pt-2'>
                    {cashFlowDetails.data?.businessStockPurPerMonthWrapperDto?.businessStockPurPerMonthDtoList?.map((stock:any, index: any) => {
                        return  <div 
                                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                                className='px-5 pt-5 rounded-md  font-sans my-4'
                                key={index}
                            >
                            <Descriptions 
                            key={index}
                            column={
                            1
                            }
                            items={stock? itemsBusinussStock(stock): []} 
                            size='small'
                        />  

                        </div>
                    })}
                </div>

                <div className='mt-5'>
                    <Descriptions 
                        key={'totalPurchasingPerMonth'}
                        column={
                        3
                        }
                        items={[
                            {
                                key: 'totalPurchasingPerMonth',
                                label: 'Total Purchasing per Month',
                                children: <div className='font-bold'>
                                    {getCurrency(cashFlowDetails.data?.businessStockPurPerMonthWrapperDto?.totalPurchasingPerMonth)}
                                </div>,
                                labelStyle: {
                                    color: '#102C57',
                                    fontWeight: 600,
                                    width: '50%'
                                }
                            },
                            {
                                key: 'ex1',
                                label: '',
                                children:''
                            },
                            {
                                key: 'ex2',
                                label: '',
                                children:''
                            }
                        ]} 
                        size='small'
                    />  
                </div>

                <Divider/>

                <Title 
                    level={5}
                    title='Total Expenses per month'
                    style={{color: '#7C3626'}} 
                />
                <Paragraph className='font-bold'  type="secondary">Business Expences</Paragraph>
                <Descriptions 
                    column={
                    3
                    }
                    items={cashFlowDetails.data?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0]
                        ? itemsTotalExpenseB(
                            cashFlowDetails.data?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0]
                        ): []} 
                    size='small'
                />  

                <Paragraph className='mt-5 font-bold'  type="secondary">Household Expences</Paragraph>
                <Descriptions 
                    column={
                    3
                    }
                    items={cashFlowDetails.data?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0]
                        ? itemsTotalExpenseH(
                            cashFlowDetails.data?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0]
                        ): []} 
                    size='small'
                />  

                <Divider/>

                <div className='bg-slate-200
                p-3 rounded'>
                    <Title 
                        level={5}
                        title='Cash Flow Final Summary'
                        style={{color: '#7C3626'}} 
                    />
                    <Descriptions 
                    column={
                    3
                    }
                    items={cashFlowDetails.data?.cashFlowFinalSummaryDto
                        ? itemsSummary(
                            cashFlowDetails.data?.cashFlowFinalSummaryDto
                        ): []} 
                    size='small'
                />  
                </div>
            </div>

        }
    </div>
  );
}
