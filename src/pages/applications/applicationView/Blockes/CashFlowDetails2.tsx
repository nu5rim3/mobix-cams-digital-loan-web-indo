import * as React from 'react';
import { useSelector } from 'react-redux';
import Title from '../../../../components/Typography/Tytle';
import { Button, Descriptions, DescriptionsProps, Divider, Grid, Spin, Row, Col, Form, Input, InputNumber } from 'antd';
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
        key: 'numberOfHighSeasonDays',
        label: 'No of Busy Days',
        children: getCurrency(data.numberOfHighSeasonDays),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'numberOfLowSeasonDays',
        label: 'No of Low Session Days',
        children: getCurrency(data.numberOfLowSeasonDays),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },
    {
        key: 'ex1',
        label: '',
        children: ''
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
        key: 'monthlyRevenue',
        label: 'Monthly Revenue',
        children: getCurrency(data.monthlyRevenue),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    },

    {
        key: 'ex1',
        label: '',
        children: ''
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
    }, {
        key: 'currentTime',
        label: 'Current Time',
        children: data.currentTime,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'hoursAlreadyOpenToday',
        label: 'Hours Already Spent',
        children: data.hoursAlreadyOpenToday,
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'cashWhenOpenToday',
        label: 'Opening Amount',
        children: getCurrency(data.cashWhenOpenToday),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'cashNow',
        label: 'Current Amount',
        children: getCurrency(data.cashNow),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
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
        children: ''
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
    }, {
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
        children: ''
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
    }, {
        key: 'purchasingPrice',
        label: 'Purchasing Price',
        children: getCurrency(data.purchasingPrice),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }
    , {
        key: 'ex1',
        label: '',
        children: ''
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
    }, {
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
    }, {
        key: 'utilitiesExpense',
        label: 'Utility',
        children: getCurrency(data.utilitiesExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'rentExpense',
        label: 'Rent',
        children: getCurrency(data.rentExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'employeeSalaryExpense',
        label: 'Employee Salary',
        children: getCurrency(data.employeeSalaryExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'otherExpense',
        label: 'Other',
        children: getCurrency(data.otherExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'ex1',
        label: '',
        children: ''
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
    }, {
        key: 'transportationExpense',
        label: 'Transport',
        children: getCurrency(data.transportationExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'utilitiesExpense',
        label: 'Utility',
        children: getCurrency(data.utilitiesExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'educationExpense',
        label: 'Education',
        children: getCurrency(data.educationExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'socialContributionExpense',
        label: 'Social Contribution',
        children: getCurrency(data.socialContributionExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'healthExpense',
        label: 'Health',
        children: getCurrency(data.healthExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'loanPaymentsExpense',
        label: 'Loan Payments',
        children: getCurrency(data.loanPaymentsExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'otherExpense',
        label: 'Other',
        children: getCurrency(data.otherExpense),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '50%'
        }
    }, {
        key: 'ex1',
        label: '',
        children: ''
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
    }, {
        key: 'maximumWeeklyInstallment',
        label: 'Maximum Weekly Installment',
        children: getCurrency(data.maximumWeeklyInstallment),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '60%'
        }
    }, {
        key: 'netIncomePerMonth',
        label: 'Net Income per Month',
        children: getCurrency(data.netIncomePerMonth),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '60%'
        }
    }, {
        key: 'netIncomePerWeek',
        label: 'Net Income per Week',
        children: getCurrency(data.netIncomePerWeek),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '60%'
        }
    }, {
        key: 'totalExpensesPerMonth',
        label: 'Total Purchasing Per Month',
        children: getCurrency(data.totalExpensesPerMonth),
        labelStyle: {
            color: '#102C57',
            fontWeight: 600,
            width: '60%'
        }
    }, {
        key: 'ex1',
        label: '',
        children: ''
    },
]

export default function CashFlowDetails(props: ICashFlowDetailsProps) {
    const [form] = Form.useForm();
    const {
        cashFlowDetails
    } = useSelector((state: any) => state.Application)

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const initialValues = {
        businessDayPerMonth: cashFlowDetails.data ?.salesOperatingRevenueDto.businessDayPerMonth
    };


    console.log("props ", props)
    console.log("cashFlowDetails ", cashFlowDetails)
    const handleTotal = (changedValues, allValues) => {
        const fieldName = Object.keys(changedValues)[0];
        console.log("fieldName ", fieldName)
        if (fieldName === "revenueInBusyDay" || fieldName === "numberOfHighSeasonDays"
            || fieldName === "revenueInLowSessionDay" || fieldName === "numberOfLowSeasonDays") {
            const revenueInBusyDay =
                changedValues["revenueInBusyDay"] || allValues["revenueInBusyDay"] || 0;
            const noOfBusyDays =
                changedValues["numberOfHighSeasonDays"] || allValues["numberOfHighSeasonDays"] || 0;
            const revenueInLowSessionDay =
                changedValues["revenueInLowSessionDay"] || allValues["revenueInLowSessionDay"] || 0;
            const numberOfLowSeasonDays =
                changedValues["numberOfLowSeasonDays"] || allValues["numberOfLowSeasonDays"] || 0;

            const revenuePerMonth = ((revenueInBusyDay * noOfBusyDays) + (revenueInLowSessionDay * numberOfLowSeasonDays));
            console.log("revenueInBusyDay ", revenueInBusyDay)
            console.log("noOfBusyDays ", noOfBusyDays)
            console.log("revenueInLowSessionDay ", revenueInLowSessionDay)
            console.log("numberOfLowSeasonDays ", numberOfLowSeasonDays)
            console.log("revenuePerMonth ", revenuePerMonth)
            form.setFieldsValue({ revenuePerMonth: revenuePerMonth });
        }

        if (fieldName === "revenueOneDayBefore" || fieldName === "revenueTwoDaysBefore"
            || fieldName === "revenueThreeDaysBefore") {
            const revenueOneDayBefore =
                changedValues["revenueOneDayBefore"] || allValues["revenueOneDayBefore"] || 0;
            const revenueTwoDaysBefore =
                changedValues["revenueTwoDaysBefore"] || allValues["revenueTwoDaysBefore"] || 0;
            const revenueThreeDaysBefore =
                changedValues["revenueThreeDaysBefore"] || allValues["revenueThreeDaysBefore"] || 0;
            const averagePerDay = ((revenueOneDayBefore + revenueTwoDaysBefore + revenueThreeDaysBefore) / 3);
            const monthlyRevenue = (averagePerDay * 24);
            form.setFieldsValue({ averagePerDay: averagePerDay, monthlyRevenue: monthlyRevenue });
        }

        if (fieldName === "cashWhenOpenToday" || fieldName === "cashNow"
            || fieldName === "moneyForPurchasingToday" || fieldName === "hoursAlreadyOpenToday"
            || fieldName === "numberOfBusinessHoursPerDay" || fieldName === "businessDayPerMonth") {

            const cashWhenOpenToday =
                changedValues["cashWhenOpenToday"] || allValues["cashWhenOpenToday"] || 0;
            const cashNow =
                changedValues["cashNow"] || allValues["cashNow"] || 0;
            const moneyForPurchasingToday =
                changedValues["moneyForPurchasingToday"] || allValues["moneyForPurchasingToday"] || 0;
            const hoursAlreadyOpenToday =
                changedValues["hoursAlreadyOpenToday"] || allValues["hoursAlreadyOpenToday"] || 0;
            const businessDayPerMonth =
                changedValues["businessDayPerMonth"] || allValues["businessDayPerMonth"] || 0;
            const numberOfBusinessHoursPerDay =
                changedValues["numberOfBusinessHoursPerDay"] || allValues["numberOfBusinessHoursPerDay"] || 0;

            const incomeToday = (cashNow - (cashWhenOpenToday + moneyForPurchasingToday));
            const incomePerBusinessHour = (incomeToday / hoursAlreadyOpenToday);
            const estimatedIncomePerDay = (numberOfBusinessHoursPerDay * incomePerBusinessHour);
            const estimatedIncomePerMonth = (estimatedIncomePerDay * businessDayPerMonth);
            form.setFieldsValue(
                {
                    incomeToday: incomeToday,
                    incomePerBusinessHour: incomePerBusinessHour,
                    estimatedIncomePerDay: estimatedIncomePerDay,
                    estimatedIncomePerMonth: estimatedIncomePerMonth

                });
        }

    };


    return (
        <div
            style={{
                fontWeight: 300
            }}
        >
            < div>
                {
                    cashFlowDetails.fetching ?
                        <div className='w-full h-32 flex justify-center'>
                            <Spin />
                        </div>
                        :
                        <div>
                            <Form
                                form={form}
                                name="cashFlowUpdate"
                                layout='vertical'
                                scrollToFirstError
                                onFinish={(e) => saveCashFlow(e)}
                                wrapperCol={{ span: 20 }}
                                onValuesChange={handleTotal}
                                initialValues={initialValues}
                            >
                                <Row>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Cash Flow - MFO '
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Cash Flow - CA '
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Sales/Operations Revenue - MFO'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Sales/Operations Revenue - CA'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <div className='mt-4'>
                                            <Descriptions
                                                column={screens.lg ?
                                                    1 : 1
                                                }
                                                items={cashFlowDetails.data ?.salesOperatingRevenueDto
                                                    ? itemsSalesOperation(cashFlowDetails.data ?.salesOperatingRevenueDto): []} 
                                                size='small'
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className='mt-4'>
                                            <div className={
                                                screens.xs
                                                    ? 'px-2'
                                                    : 'flex justify-between px-0'
                                            }>

                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Business Day per Month"
                                                    name='businessDayPerMonth'
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
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Revenue in Busy Day"
                                                    name='revenueInBusyDay'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        value={cashFlowDetails.data ?.salesOperatingRevenueDto ? cashFlowDetails.data ?.salesOperatingRevenueDto.revenueInBusyDay : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="No of Low Session Days"
                                                    name='numberOfLowSeasonDays'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesOperatingRevenueDto ? cashFlowDetails.data ?.salesOperatingRevenueDto.numberOfLowSeasonDays : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Revenue in Low Session Day"
                                                    name='revenueInLowSessionDay'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesOperatingRevenueDto ? cashFlowDetails.data ?.salesOperatingRevenueDto.revenueInLowSessionDay : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className={
                                                screens.xs
                                                    ? 'px-2'
                                                    : 'flex justify-between px-0'
                                            }>

                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="No of Busy Days"
                                                    name='numberOfHighSeasonDays'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        style={{ margin: 0 }}
                                                        defaultValue={cashFlowDetails.data ?.salesOperatingRevenueDto ? cashFlowDetails.data ?.salesOperatingRevenueDto.numberOfHighSeasonDays : 0}

                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Revenue per Month"
                                                    name='revenuePerMonth'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesOperatingRevenueDto ? cashFlowDetails.data ?.salesOperatingRevenueDto.revenuePerMonth : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                        onChange={(e: any) => {
                                                            // actions.updateLoan(e)

                                                        }}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                                <Divider />
                                <Row>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Sales Revenue (3 Days Cross Check)- MFO'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Sales Revenue (3 Days Cross Check) - CA'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className='mt-4'>
                                            <Descriptions
                                                column={screens.lg ?
                                                    1 : 1
                                                }
                                                items={cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto
                                                    ? itemsSalesRevenue3Day(cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto): []} 
                                                size='small'
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className='mt-4'>

                                            <div className={
                                                screens.xs
                                                    ? 'px-2'
                                                    : 'flex justify-between px-0'
                                            }>

                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Revenue 1 Day Before"
                                                    name='revenueOneDayBefore'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto.revenueOneDayBefore : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Revenue 2 Days Before"
                                                    name='revenueTwoDaysBefore'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto.revenueTwoDaysBefore : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Revenue 3 Days Before"
                                                    name='revenueThreeDaysBefore'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto.revenueThreeDaysBefore : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Average per Day"
                                                    name='averagePerDay'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto.averagePerDay : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>


                                            </div>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Monthly Revenue"
                                                    name='monthlyRevenue'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data ?.salesThreeDayCroscheckRevenueDto.monthlyRevenue : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Sales Revenue (Cash Cross Check) - MFO'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Sales Revenue (Cash Cross Check) - CA'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className='mt-4'>
                                            <Descriptions
                                                column={screens.lg ?
                                                    1 : 1
                                                }
                                                items={cashFlowDetails.data ?.salesCashCroscheckRevenueDto
                                                    ? itemsSalesRevenueCash(cashFlowDetails.data ?.salesCashCroscheckRevenueDto): []} 
                                                size='small'
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className='mt-4'>

                                            <div className={
                                                screens.xs
                                                    ? 'px-2'
                                                    : 'flex justify-between px-0'
                                            }>

                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Business Hours per Day"
                                                    name='numberOfBusinessHoursPerDay'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.numberOfBusinessHoursPerDay : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Current Time"
                                                    name='currentTime'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.currentTime : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Hours Already Spent"
                                                    name='hoursAlreadyOpenToday'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.hoursAlreadyOpenToday : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Opening Amount"
                                                    name='cashWhenOpenToday'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.cashWhenOpenToday : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>


                                            </div>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Current Amount"
                                                    name='cashNow'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.cashNow : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Purchase Amount"
                                                    name='moneyForPurchasingToday'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.moneyForPurchasingToday : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Today Income"
                                                    name='incomeToday'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.incomeToday : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Income per Business Hour"
                                                    name='incomePerBusinessHour'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.incomePerBusinessHour : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Estimated Income per Day"
                                                    name='estimatedIncomePerDay'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.estimatedIncomePerDay : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Estimated Income per Month"
                                                    name='estimatedIncomePerMonth'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        defaultValue={cashFlowDetails.data ?.salesCashCroscheckRevenueDto ? cashFlowDetails.data ?.salesCashCroscheckRevenueDto.estimatedIncomePerMonth : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />

                                {/* other incomes */}
                                <Title
                                    level={5}
                                    title='Total Other Income'
                                    style={{ color: '#7C3626' }}
                                />

                                <div className={
                                    screens.xs
                                        ? 'grid grid-cols-1 gap-5 pt-2'
                                        : 'grid grid-cols-4 gap-5 pt-2'
                                }>
                                    {cashFlowDetails.data ?.otherIncomeWrapperDto ?.otherIncomeDtoList ?.map((stock: any, index: any) => {
                                        return <div
                                            style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                                            className='px-5 pt-5 rounded-md  font-sans my-4'
                                            key={index}
                                        >
                                            <Descriptions
                                                key={index}
                                                column={
                                                    1
                                                }
                                                items={stock ? itemsOtherIncome(stock) : []}
                                                size='small'
                                            />

                                        </div>
                                    })}
                                </div>

                                <div className='mt-5'>
                                    <Descriptions
                                        key={'totalOtherIncome'}
                                        column={screens.xs ?
                                            1 : 3
                                        }
                                        items={[
                                            {
                                                key: 'totalOtherIncome',
                                                label: 'Total Other Income',
                                                children: <div className='font-bold'>
                                                    {getCurrency(cashFlowDetails.data ?.otherIncomeWrapperDto ?.totalOtherIncome)}
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
                                                children: ''
                                            },
                                            {
                                                key: 'ex2',
                                                label: '',
                                                children: ''
                                            }
                                        ]}
                                        size='small'
                                    />
                                </div>

                                <Divider />

                                <Title
                                    level={5}
                                    title='Gross Revenue per month'
                                    style={{ color: '#7C3626' }}
                                />

                                <div className='mt-4'>
                                    <Descriptions
                                        column={screens.xs ?
                                            1 : 3
                                        }
                                        items={cashFlowDetails.data ?.salesCashCroscheckRevenueDto
                                            ? itemsGrossRevenue({
                                                ...cashFlowDetails.data ?.cashFlowFinalSummaryDto,
                                                ...cashFlowDetails.data ?.otherIncomeWrapperDto
                            }) : []} 
                                        size='small'
                                    />
                                </div>

                                <Divider />
                                <Row>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Total Expenses per month - MFO'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Total Expenses per month - CA'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                </Row>


                                <div className={
                                    screens.xs
                                        ? 'grid grid-cols-1 gap-5 pt-2'
                                        : 'grid grid-cols-4 gap-5 pt-2'
                                }>
                                    {cashFlowDetails.data ?.businessStockPurPerMonthWrapperDto ?.businessStockPurPerMonthDtoList ?.map((stock: any, index: any) => {
                                        return <div
                                            style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                                            className='px-5 pt-5 rounded-md  font-sans my-4'
                                            key={index}
                                        >
                                            <Descriptions
                                                key={index}
                                                column={
                                                    1
                                                }
                                                items={stock ? itemsBusinussStock(stock) : []}
                                                size='small'
                                            />

                                        </div>
                                    })}
                                </div>

                                <div className='mt-5'>
                                    <Descriptions
                                        key={'totalPurchasingPerMonth'}
                                        column={screens.xs ?
                                            1 : 3
                                        }
                                        items={[
                                            {
                                                key: 'totalPurchasingPerMonth',
                                                label: 'Total Purchasing per Month',
                                                children: <div className='font-bold'>
                                                    {getCurrency(cashFlowDetails.data ?.businessStockPurPerMonthWrapperDto ?.totalPurchasingPerMonth)}
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
                                                children: ''
                                            },
                                            {
                                                key: 'ex2',
                                                label: '',
                                                children: ''
                                            }
                                        ]}
                                        size='small'
                                    />
                                </div>

                                <Divider />
                                <Row>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Total Expenses per month - MFO'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Total Expenses per month - CA'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Paragraph className='font-bold' type="secondary">Business Expences - MFO</Paragraph>

                                    </Col>
                                    <Col span={12}>
                                        <Paragraph className='font-bold' type="secondary">Business Expences - CA</Paragraph>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Descriptions
                                            column={screens.xs ?
                                                1 : 2
                                            }
                                            items={cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0]
                                                ? itemsTotalExpenseB(
                                                    cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0]
                        ): []} 
                                            size='small'
                                        />
                                    </Col>
                                    <Col span={12}>

                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Transportation"
                                                name='transportationExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0].transportationExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Utility"
                                                name='utilitiesExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0].utilitiesExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Rent"
                                                name='rentExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0].rentExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Employee Salary"
                                                name='employeeSalaryExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0].employeeSalaryExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Other"
                                                name='otherExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.businessExpPerMonthWrapperDto ?.businessExpPerMonthDtoList ?.[0].otherExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>

                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Paragraph className='mt-5 font-bold' type="secondary">Household Expences - MFO</Paragraph>

                                    </Col>
                                    <Col span={12}>
                                        <Paragraph className='mt-5 font-bold' type="secondary">Household Expences - CA</Paragraph>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>

                                        <Descriptions
                                            column={screens.xs ?
                                                1 : 2
                                            }
                                            items={cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0]
                                                ? itemsTotalExpenseH(
                                                    cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0]
                        ): []} 
                                            size='small'
                                        />
                                    </Col>
                                    <Col span={12}>

                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Food"
                                                name='foodExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0].foodExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Transport"
                                                name='transportationExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0].transportationExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Utility"
                                                name='utilitiesExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0].utilitiesExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Education"
                                                name='educationExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0].educationExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Social Contribution"
                                                name='socialContributionExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0].socialContributionExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Health"
                                                name='healthExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0].healthExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Loan Payments"
                                                name='loanPaymentsExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0].loanPaymentsExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Other"
                                                name='otherExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0] ? cashFlowDetails.data ?.houseHoldExpPerMonthWrapperDto ?.houseHoldExpPerMonthDtoList ?.[0].otherExpense : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />

                                <div className='bg-slate-200
                                    p-3 rounded'>
                                <Row>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Cash Flow Final Summary - MFO'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Cash Flow Final Summary - CA'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Descriptions
                                            column={screens.xs ?
                                                1 : 2
                                            }
                                            items={cashFlowDetails.data ?.cashFlowFinalSummaryDto
                                                ? itemsSummary(
                                                    cashFlowDetails.data ?.cashFlowFinalSummaryDto
                        ): []} 
                                            size='small'
                                        />
                                    </Col>
                                    <Col span={12}>

                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Maximum Monthly Installment"
                                                name='maximumMonthlyInstallment'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.cashFlowFinalSummaryDto ? cashFlowDetails.data ?.cashFlowFinalSummaryDto.maximumMonthlyInstallment : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Maximum Weekly Installment"
                                                name='maximumWeeklyInstallment'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.cashFlowFinalSummaryDto ? cashFlowDetails.data ?.cashFlowFinalSummaryDto.maximumWeeklyInstallment : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Net Income per Month"
                                                name='netIncomePerMonth'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.cashFlowFinalSummaryDto ? cashFlowDetails.data ?.cashFlowFinalSummaryDto.netIncomePerMonth : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Net Income per Week"
                                                name='netIncomePerWeek'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.cashFlowFinalSummaryDto ? cashFlowDetails.data ?.cashFlowFinalSummaryDto.netIncomePerWeek : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={
                                            screens.xs
                                                ? 'px-2'
                                                : 'flex justify-between px-0'
                                        }>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Total Purchasing Per Month"
                                                name='totalExpensesPerMonth'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    defaultValue={cashFlowDetails.data ?.cashFlowFinalSummaryDto ? cashFlowDetails.data ?.cashFlowFinalSummaryDto.totalExpensesPerMonth : 0}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                </Row>   
                           </div>
                            <Row>
                                <Col span={12}>

                                </Col>
                                <Col span={12}>
                                    <div className='mt-5'>
                                        <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } }}>
                                            <Button type="primary" size='large' shape="round" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>

                                    </div>
                                </Col>
                            </Row>
                            </Form>
                        </div >

                }

            </div >
        </div >
    );
}
