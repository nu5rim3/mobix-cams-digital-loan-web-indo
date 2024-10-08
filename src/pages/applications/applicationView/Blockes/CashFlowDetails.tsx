// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Title from '../../../../components/Typography/Tytle';
import { Button, notification, TimePicker, Space, Descriptions, DescriptionsProps, Divider, Grid, Spin, Row, Col, Form, Input, InputNumber } from 'antd';
import getCurrency, { converToCurrency } from '../../../../utils/getCurrency';
import Paragraph from 'antd/es/typography/Paragraph';
import { API } from '../../../../services/Services';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CurrencyInput from '../../../../components/CurrencyInput/CurrencyInput';
// dayjs.extend(customParseFormat);
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
        customerData,
        cashFlowDetails
    } = useSelector((state: any) => state.Application)
    const {
        selectedRole,
        userData
    } = useSelector((state: any) => state.AppData)
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const [currentTime, setCurrentTime] = useState('');
    const saveCashFlow = async (e: any) => {

        try {
            const data = {
                idx: customerData.data.appraisalId,
                roleCode: selectedRole,
                salesOperatingRevenueDto: {
                    appraisalId: cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto.appraisalId : null,
                    businessDayPerMonth: e.businessDayPerMonth,
                    revenueInBusyDay: e.revenueInBusyDay,
                    revenueInLowSessionDay: e.revenueInLowSessionDay,
                    revenuePerMonth: e.revenuePerMonth,
                    numberOfHighSeasonDays: e.numberOfHighSeasonDays,
                    numberOfLowSeasonDays: e.numberOfLowSeasonDays
                },
                salesThreeDayCroscheckRevenueDto: {
                    appraisalId: cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto.appraisalId : null,
                    revenueOneDayBefore: e.revenueOneDayBefore,
                    revenueTwoDaysBefore: e.revenueTwoDaysBefore,
                    revenueThreeDaysBefore: e.revenueThreeDaysBefore,
                    averagePerDay: e.averagePerDay,
                    monthlyRevenue: e.monthlyRevenue,
                },
                salesCashCroscheckRevenueDto: {
                    appraisalId: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.appraisalId : null,
                    numberOfBusinessHoursPerDay: e.numberOfBusinessHoursPerDay,
                    currentTime: e.currentTime,
                    hoursAlreadyOpenToday: e.hoursAlreadyOpenToday,
                    cashWhenOpenToday: e.cashWhenOpenToday,
                    cashNow: e.cashNow,
                    moneyForPurchasingToday: e.moneyForPurchasingToday,
                    incomeToday: e.incomeToday,
                    incomePerBusinessHour: e.incomePerBusinessHour,
                    estimatedIncomePerDay: e.estimatedIncomePerDay,
                    businessDaysPerMonth: e.businessDaysPerMonth,
                    estimatedIncomePerMonth: e.estimatedIncomePerMonth
                },
                businessExpPerMonthWrapperDto: {
                    totalExpPerMonth: e.totalExpPerMonth,
                    businessExpPerMonthDtoList: [
                        {
                            appraisalId: cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].appraisalId : null,
                            transportationExpense: e.bnsTransportationExpense,
                            utilitiesExpense: e.bnsUtilitiesExpense,
                            rentExpense: e.rentExpense,
                            employeeSalaryExpense: e.employeeSalaryExpense,
                            otherExpense: e.bnsOtherExpense

                        }
                    ]
                },
                houseHoldExpPerMonthWrapperDto: {
                    householdExpenditurePerMonth: e.householdExpenditurePerMonth,
                    houseHoldExpPerMonthDtoList: [
                        {
                            appraisalId: cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].appraisalId : null,
                            foodExpense: e.foodExpense,
                            utilitiesExpense: e.houseHoldUtilitiesExpense,
                            transportationExpense: e.houseHoldTransportationExpense,
                            educationExpense: e.educationExpense,
                            healthExpense: e.healthExpense,
                            socialContributionExpense: e.socialContributionExpense,
                            loanPaymentsExpense: e.loanPaymentsExpense,
                            otherExpense: e.houseHoldOtherExpense
                        }
                    ]
                },
                otherIncomeWrapperDto: {
                    totalOtherIncome: e.totalOtherIncome,
                    otherIncomeDtoList: e.sources.map((source: string) => ({
                        appraisalId: source.appraisalId,
                        source: source.source,
                        amount: source.amount,
                        isDeleted: source.isDeleted
                    })),
                },
                businessStockPurPerMonthWrapperDto: {
                    totalPurchasingPerMonth: e.totalPurchasingPerMonth,
                    businessStockPurPerMonthDtoList: e.stocks.map((stock: string) => ({
                        appraisalId: stock.appraisalId,
                        stockName: stock.stockName,
                        purchasingPrice: stock.purchasingPrice,
                        isDeleted: stock.isDeleted
                    })),
                },
                cashFlowFinalSummaryDto: {
                    appraisalId: cashFlowDetails.data?.cashFlowCa?.businessStockPurPerMonthWrapperDto ? cashFlowDetails.data?.cashFlowCa?.businessStockPurPerMonthWrapperDto.appraisalId : null,
                    totalExpensesPerMonth: e.totalExpensesPerMonth,
                    netIncomePerMonth: e.netIncomePerMonth,
                    netIncomePerWeek: e.netIncomePerWeek,
                    maximumWeeklyInstallment: e.maximumWeeklyInstallment,
                    maximumMonthlyInstallment: e.maximumMonthlyInstallment,
                    grossRevenuePerMonth: e.grossRevenuePerMonth
                }
            }

            if (cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto != 'undefined'
                && cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto != null) {
                const incomeExpence = await API.incomeExpencesServices.updateCashFlow(customerData.data.appraisalId, {
                    ...data,
                })
                notification.success({
                    message: 'Cash Flow has been updated successfully'
                })

            } else {

                const incomeExpence = await API.incomeExpencesServices.saveCashFlow(customerData.data.appraisalId, {
                    ...data,
                })
                notification.success({
                    message: 'Cash Flow has been created successfully'
                })

            }


        } catch (error) {
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
        } finally {
            //setAllLoading(false)
        }
    }


    const handleTotal = (changedValues, allValues) => {
        const fieldName = Object.keys(changedValues)[0];

        if (fieldName === "revenueInBusyDay" || fieldName === "numberOfHighSeasonDays"
            || fieldName === "revenueInLowSessionDay" || fieldName === "numberOfLowSeasonDays") {
            const revenueInBusyDay =
                changedValues["revenueInBusyDay"] || allValues["revenueInBusyDay"] || form.getFieldValue('revenueInBusyDay');
            const noOfBusyDays =
                changedValues["numberOfHighSeasonDays"] || allValues["numberOfHighSeasonDays"] || form.getFieldValue('numberOfHighSeasonDays');
            const revenueInLowSessionDay =
                changedValues["revenueInLowSessionDay"] || allValues["revenueInLowSessionDay"] || form.getFieldValue('revenueInLowSessionDay');
            const numberOfLowSeasonDays =
                changedValues["numberOfLowSeasonDays"] || allValues["numberOfLowSeasonDays"] || form.getFieldValue('numberOfLowSeasonDays');

            const revenuePerMonth = (revenueInBusyDay * noOfBusyDays) + (revenueInLowSessionDay * numberOfLowSeasonDays);

            if (revenuePerMonth <= form.getFieldValue('estimatedIncomePerMonth') && revenuePerMonth <= form.getFieldValue('monthlyRevenue')) {
                form.setFieldsValue({ grossRevenuePerMonth: revenuePerMonth });
            }
            form.setFieldsValue({ revenuePerMonth: revenuePerMonth });
        }

        if (fieldName === "revenueOneDayBefore" || fieldName === "revenueTwoDaysBefore"
            || fieldName === "revenueThreeDaysBefore" || fieldName === "businessDayPerMonth") {
            const revenueOneDayBefore =
                changedValues["revenueOneDayBefore"] || allValues["revenueOneDayBefore"] || form.getFieldValue('revenueOneDayBefore');
            const revenueTwoDaysBefore =
                changedValues["revenueTwoDaysBefore"] || allValues["revenueTwoDaysBefore"] || form.getFieldValue('revenueTwoDaysBefore');
            const revenueThreeDaysBefore =
                changedValues["revenueThreeDaysBefore"] || allValues["revenueThreeDaysBefore"] || form.getFieldValue('revenueThreeDaysBefore');
            const averagePerDay = ((revenueOneDayBefore + revenueTwoDaysBefore + revenueThreeDaysBefore) / 3);
            const monthlyRevenue = (averagePerDay * form.getFieldValue('businessDayPerMonth'));
            if (monthlyRevenue <= form.getFieldValue('estimatedIncomePerMonth') && monthlyRevenue <= form.getFieldValue('revenuePerMonth')) {
                form.setFieldsValue({ grossRevenuePerMonth: monthlyRevenue });
            }
            form.setFieldsValue({ averagePerDay: averagePerDay, monthlyRevenue: monthlyRevenue });
        }

        if (fieldName === "cashWhenOpenToday" || fieldName === "cashNow"
            || fieldName === "moneyForPurchasingToday" || fieldName === "hoursAlreadyOpenToday"
            || fieldName === "numberOfBusinessHoursPerDay" || fieldName === "businessDayPerMonth") {

            const cashWhenOpenToday =
                changedValues["cashWhenOpenToday"] || allValues["cashWhenOpenToday"] || form.getFieldValue('cashWhenOpenToday');
            const cashNow =
                changedValues["cashNow"] || allValues["cashNow"] || form.getFieldValue('cashNow');
            const moneyForPurchasingToday =
                changedValues["moneyForPurchasingToday"] || allValues["moneyForPurchasingToday"] || form.getFieldValue('moneyForPurchasingToday');
            const hoursAlreadyOpenToday =
                changedValues["hoursAlreadyOpenToday"] || allValues["hoursAlreadyOpenToday"] || form.getFieldValue('hoursAlreadyOpenToday');
            const businessDayPerMonth =
                changedValues["businessDayPerMonth"] || allValues["businessDayPerMonth"] || form.getFieldValue('businessDayPerMonth');
            const numberOfBusinessHoursPerDay =
                changedValues["numberOfBusinessHoursPerDay"] || allValues["numberOfBusinessHoursPerDay"] || form.getFieldValue('numberOfBusinessHoursPerDay');

            const incomeToday = (cashNow - (cashWhenOpenToday + moneyForPurchasingToday));

            const incomePerBusinessHour = incomeToday / hoursAlreadyOpenToday;

            const estimatedIncomePerDay = (numberOfBusinessHoursPerDay * incomePerBusinessHour);

            const estimatedIncomePerMonth = (estimatedIncomePerDay * businessDayPerMonth);

            if (estimatedIncomePerMonth <= form.getFieldValue('monthlyRevenue') && estimatedIncomePerMonth <= form.getFieldValue('revenuePerMonth')) {
                form.setFieldsValue({ grossRevenuePerMonth: estimatedIncomePerMonth });
            }
            form.setFieldsValue(
                {
                    incomeToday: incomeToday,
                    incomePerBusinessHour: incomePerBusinessHour,
                    estimatedIncomePerDay: estimatedIncomePerDay,
                    estimatedIncomePerMonth: estimatedIncomePerMonth

                });
        }

        if (fieldName === "bnsTransportationExpense" || fieldName === "bnsUtilitiesExpense"
            || fieldName === "rentExpense" || fieldName === "employeeSalaryExpense"
            || fieldName === "bnsOtherExpense" || fieldName === "foodExpense"
            || fieldName === "houseHoldUtilitiesExpense" || fieldName === "houseHoldTransportationExpense"
            || fieldName === "educationExpense" || fieldName === "healthExpense"
            || fieldName === "socialContributionExpense" || fieldName === "loanPaymentsExpense"
            || fieldName === "houseHoldOtherExpense") {

            const bnsTransportationExpense =
                changedValues["bnsTransportationExpense"] || allValues["bnsTransportationExpense"] || form.getFieldValue('bnsTransportationExpense');
            const bnsUtilitiesExpense =
                changedValues["bnsUtilitiesExpense"] || allValues["bnsUtilitiesExpense"] || form.getFieldValue('bnsUtilitiesExpense');
            const rentExpense =
                changedValues["rentExpense"] || allValues["rentExpense"] || form.getFieldValue('rentExpense');
            const employeeSalaryExpense =
                changedValues["employeeSalaryExpense"] || allValues["employeeSalaryExpense"] || form.getFieldValue('employeeSalaryExpense');

            const bnsOtherExpense =
                changedValues["bnsOtherExpense"] || allValues["bnsOtherExpense"] || form.getFieldValue('bnsOtherExpense');
            const foodExpense =
                changedValues["foodExpense"] || allValues["foodExpense"] || form.getFieldValue('foodExpense');


            const houseHoldUtilitiesExpense =
                changedValues["houseHoldUtilitiesExpense"] || allValues["houseHoldUtilitiesExpense"] || form.getFieldValue('houseHoldUtilitiesExpense');
            const houseHoldTransportationExpense =
                changedValues["houseHoldTransportationExpense"] || allValues["houseHoldTransportationExpense"] || form.getFieldValue('houseHoldTransportationExpense');

            const educationExpense =
                changedValues["educationExpense"] || allValues["educationExpense"] || form.getFieldValue('educationExpense');

            const healthExpense =
                changedValues["healthExpense"] || allValues["healthExpense"] || form.getFieldValue('healthExpense');
            const socialContributionExpense =
                changedValues["socialContributionExpense"] || allValues["socialContributionExpense"] || form.getFieldValue('socialContributionExpense');

            const loanPaymentsExpense =
                changedValues["loanPaymentsExpense"] || allValues["loanPaymentsExpense"] || form.getFieldValue('loanPaymentsExpense');
            const houseHoldOtherExpense =
                changedValues["houseHoldOtherExpense"] || allValues["houseHoldOtherExpense"] || form.getFieldValue('houseHoldOtherExpense');

            const totExpensePerMonth = bnsTransportationExpense + bnsUtilitiesExpense + rentExpense
                + employeeSalaryExpense + bnsOtherExpense
                + foodExpense + houseHoldUtilitiesExpense
                + houseHoldTransportationExpense + educationExpense + healthExpense
                + socialContributionExpense + loanPaymentsExpense + houseHoldOtherExpense;

            form.setFieldsValue(
                {
                    totalExpensesPerMonth: totExpensePerMonth

                });
        }



        let purchasingPrice = 0;
        if (fieldName === "stocks") {

            allValues.stocks.forEach((stock: any, index: any) => {
                if (stock && stock.purchasingPrice) {

                    purchasingPrice = purchasingPrice + stock.purchasingPrice;

                }


            });
            const totalPurchasingPerMonth = purchasingPrice;
            form.setFieldsValue(
                {
                    totalPurchasingPerMonth: totalPurchasingPerMonth

                });

        }
        let otherIncome = 0;

        if (fieldName === "sources") {

            allValues.sources.forEach((source: any, index: any) => {
                if (source && source.amount) {
                    otherIncome = otherIncome + source.amount;

                }


            });

            const totOtherIncome = otherIncome;
            form.setFieldsValue(
                {
                    totalOtherIncome: totOtherIncome ?? 0

                });

        }
        if (fieldName === "bnsTransportationExpense" || fieldName === "bnsUtilitiesExpense"
            || fieldName === "rentExpense" || fieldName === "employeeSalaryExpense"
            || fieldName === "bnsOtherExpense" || fieldName === "foodExpense"
            || fieldName === "houseHoldUtilitiesExpense" || fieldName === "houseHoldTransportationExpense"
            || fieldName === "educationExpense" || fieldName === "healthExpense"
            || fieldName === "socialContributionExpense" || fieldName === "loanPaymentsExpense"
            || fieldName === "houseHoldOtherExpense" || fieldName === "stocks"
            || fieldName === "sources"
            || fieldName === "revenueInBusyDay" || fieldName === "numberOfHighSeasonDays"
            || fieldName === "revenueInLowSessionDay" || fieldName === "numberOfLowSeasonDays"
            || fieldName === "revenueOneDayBefore" || fieldName === "revenueTwoDaysBefore"
            || fieldName === "revenueThreeDaysBefore" || fieldName === "cashWhenOpenToday" || fieldName === "cashNow"
            || fieldName === "moneyForPurchasingToday" || fieldName === "hoursAlreadyOpenToday"
            || fieldName === "numberOfBusinessHoursPerDay" || fieldName === "businessDayPerMonth") {
            const totExpenditure = form.getFieldValue('totalExpensesPerMonth') + form.getFieldValue('totalPurchasingPerMonth');

            const totGrossIncome = form.getFieldValue('grossRevenuePerMonth') + form.getFieldValue('totalOtherIncome');

            const netIncomeMonth = totGrossIncome - totExpenditure;

            const maxMonthInstallment = netIncomeMonth * 0.35;

            const netIncomeWeek = netIncomeMonth / 4;

            const maxWeekInstallment = netIncomeWeek * 0.35;

            form.setFieldsValue(
                {
                    netIncomePerMonth: Number(netIncomeMonth).toFixed(2),
                    maximumMonthlyInstallment: Number(maxMonthInstallment).toFixed(2),
                    netIncomePerWeek: Number(netIncomeWeek).toFixed(2),
                    maximumWeeklyInstallment: Number(maxWeekInstallment).toFixed(2)
                });

        }
    };

    const stockDetails = cashFlowDetails.data?.cashFlowCa?.businessStockPurPerMonthWrapperDto?.businessStockPurPerMonthDtoList ?
        cashFlowDetails.data?.cashFlowCa?.businessStockPurPerMonthWrapperDto?.businessStockPurPerMonthDtoList
        : cashFlowDetails.data?.cashFlowMfo?.businessStockPurPerMonthWrapperDto?.businessStockPurPerMonthDtoList
            ?.map((stock: any) => {
                return {
                    appraisalId: stock.appraisalId,
                    stockName: stock.stockName,
                    purchasingPrice: stock.purchasingPrice,
                    isDeleted: stock.isDeleted
                };
            });

    const sourceDetails = cashFlowDetails.data?.cashFlowCa?.otherIncomeWrapperDto?.otherIncomeDtoList
        ? cashFlowDetails.data?.cashFlowCa?.otherIncomeWrapperDto?.otherIncomeDtoList
        : cashFlowDetails.data?.cashFlowMfo?.otherIncomeWrapperDto?.otherIncomeDtoList
            ?.map((source: any) => {
                return {
                    appraisalId: source.appraisalId,
                    source: source.source,
                    amount: source.amount,
                    isDeleted: source.isDeleted
                };
            });



    useEffect(() => {
        const getDateTime = async () => {
            let tempDate = new Date();
            const currentTime = tempDate.getHours().toString().padStart(2, '0') + ':' + tempDate.getMinutes().toString().padStart(2, '0') + ':' + tempDate.getSeconds().toString().padStart(2, '0');
            setCurrentTime(currentTime);

        }

        getDateTime();


    }, [cashFlowDetails.data])
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
                                fields={[

                                    {
                                        name: ["revenueInBusyDay"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto.revenueInBusyDay ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesOperatingRevenueDto.revenueInBusyDay ?? 0,
                                    },
                                    {
                                        name: ["numberOfLowSeasonDays"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto.numberOfLowSeasonDays ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesOperatingRevenueDto.numberOfLowSeasonDays ?? 0,
                                    },
                                    {
                                        name: ["revenueInLowSessionDay"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto.revenueInLowSessionDay ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesOperatingRevenueDto.revenueInLowSessionDay ?? 0,
                                    },
                                    {
                                        name: ["numberOfHighSeasonDays"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto.numberOfHighSeasonDays ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesOperatingRevenueDto.numberOfHighSeasonDays ?? 0,
                                    },
                                    {
                                        name: ["revenuePerMonth"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto.revenuePerMonth ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesOperatingRevenueDto.revenuePerMonth ?? 0,
                                    },
                                    {
                                        name: ["revenueOneDayBefore"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto.revenueOneDayBefore ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesThreeDayCroscheckRevenueDto.revenueOneDayBefore ?? 0,
                                    },
                                    {
                                        name: ["revenueTwoDaysBefore"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto.revenueTwoDaysBefore ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesThreeDayCroscheckRevenueDto.revenueTwoDaysBefore ?? 0,
                                    },
                                    {
                                        name: ["revenueThreeDaysBefore"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto.revenueThreeDaysBefore ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesThreeDayCroscheckRevenueDto.revenueThreeDaysBefore ?? 0,
                                    },
                                    {
                                        name: ["averagePerDay"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto.averagePerDay ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesThreeDayCroscheckRevenueDto.averagePerDay ?? 0,
                                    },
                                    {
                                        name: ["monthlyRevenue"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesThreeDayCroscheckRevenueDto.monthlyRevenue ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesThreeDayCroscheckRevenueDto.monthlyRevenue ?? 0,
                                    },
                                    {
                                        name: ["numberOfBusinessHoursPerDay"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.numberOfBusinessHoursPerDay ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto.numberOfBusinessHoursPerDay ?? 0,
                                    },
                                    {
                                        name: ["currentTime"],

                                        value: currentTime,
                                    },
                                    {
                                        name: ["hoursAlreadyOpenToday"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.hoursAlreadyOpenToday ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto.hoursAlreadyOpenToday ?? 0,
                                    },
                                    {
                                        name: ["cashWhenOpenToday"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.cashWhenOpenToday ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto.cashWhenOpenToday ?? 0,
                                    },
                                    {
                                        name: ["cashNow"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.cashNow ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto.cashNow ?? 0,
                                    },
                                    {
                                        name: ["moneyForPurchasingToday"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.moneyForPurchasingToday ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto.moneyForPurchasingToday ?? 0,
                                    },
                                    {
                                        name: ["incomeToday"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.incomeToday ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto.incomeToday ?? 0,
                                    },
                                    {
                                        name: ["incomePerBusinessHour"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.incomePerBusinessHour ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto.incomePerBusinessHour ?? 0,
                                    },
                                    {
                                        name: ["estimatedIncomePerDay"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.estimatedIncomePerDay ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto.estimatedIncomePerDay ?? 0,
                                    },
                                    {
                                        name: ["estimatedIncomePerMonth"],
                                        value: cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesCashCroscheckRevenueDto.estimatedIncomePerMonth ?? 0 : cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto.estimatedIncomePerMonth ?? 0,
                                    },
                                    {
                                        name: ["bnsTransportationExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].transportationExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].transportationExpense ?? 0,
                                    },
                                    {
                                        name: ["bnsUtilitiesExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].utilitiesExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].utilitiesExpense ?? 0,
                                    },
                                    {
                                        name: ["rentExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].rentExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].rentExpense ?? 0,
                                    },
                                    {
                                        name: ["employeeSalaryExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].employeeSalaryExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].employeeSalaryExpense ?? 0,
                                    },
                                    {
                                        name: ["bnsOtherExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].otherExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0].otherExpense ?? 0,
                                    },
                                    {
                                        name: ["foodExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].foodExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].foodExpense ?? 0,
                                    },
                                    {
                                        name: ["houseHoldUtilitiesExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].utilitiesExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].utilitiesExpense ?? 0,
                                    },
                                    {
                                        name: ["houseHoldTransportationExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].transportationExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].transportationExpense ?? 0,
                                    },
                                    {
                                        name: ["educationExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].educationExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].educationExpense ?? 0,
                                    },
                                    {
                                        name: ["healthExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].healthExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].healthExpense ?? 0,
                                    },
                                    {
                                        name: ["socialContributionExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].socialContributionExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].socialContributionExpense ?? 0,
                                    },
                                    {
                                        name: ["loanPaymentsExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].loanPaymentsExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].loanPaymentsExpense ?? 0,
                                    },
                                    {
                                        name: ["houseHoldOtherExpense"],
                                        value: cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0] ? cashFlowDetails.data?.cashFlowCa?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].otherExpense ?? 0 : cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0].otherExpense ?? 0,
                                    },
                                    {
                                        name: ["maximumMonthlyInstallment"],
                                        value: cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto ? cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto.maximumMonthlyInstallment ?? 0 : cashFlowDetails.data?.cashFlowMfo?.cashFlowFinalSummaryDto.maximumMonthlyInstallment ?? 0,
                                    },
                                    {
                                        name: ["maximumWeeklyInstallment"],
                                        value: cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto ? cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto.maximumWeeklyInstallment ?? 0 : cashFlowDetails.data?.cashFlowMfo?.cashFlowFinalSummaryDto.maximumWeeklyInstallment ?? 0,
                                    },
                                    {
                                        name: ["netIncomePerMonth"],
                                        value: cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto ? cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto.netIncomePerMonth ?? 0 : cashFlowDetails.data?.cashFlowMfo?.cashFlowFinalSummaryDto.netIncomePerMonth ?? 0,
                                    },
                                    {
                                        name: ["netIncomePerWeek"],
                                        value: cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto ? cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto.netIncomePerWeek ?? 0 : cashFlowDetails.data?.cashFlowMfo?.cashFlowFinalSummaryDto.netIncomePerWeek ?? 0,
                                    },
                                    {
                                        name: ["totalExpensesPerMonth"],
                                        value: cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto ? cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto.totalExpensesPerMonth ?? 0 : cashFlowDetails.data?.cashFlowMfo?.cashFlowFinalSummaryDto.totalExpensesPerMonth ?? 0,
                                    },
                                    {
                                        name: ["grossRevenuePerMonth"],
                                        value: cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto ? cashFlowDetails.data?.cashFlowCa?.cashFlowFinalSummaryDto.grossRevenuePerMonth ?? 0 : cashFlowDetails.data?.cashFlowMfo?.cashFlowFinalSummaryDto.grossRevenuePerMonth ?? 0,
                                    },
                                    {
                                        name: ["totalOtherIncome"],
                                        value: cashFlowDetails.data?.cashFlowCa?.otherIncomeWrapperDto ? cashFlowDetails.data?.cashFlowCa?.otherIncomeWrapperDto.totalOtherIncome ?? 0 : cashFlowDetails.data?.cashFlowMfo?.otherIncomeWrapperDto.totalOtherIncome ?? 0,
                                    },
                                    {
                                        name: ["totalPurchasingPerMonth"],
                                        value: cashFlowDetails.data?.cashFlowCa?.businessStockPurPerMonthWrapperDto ? cashFlowDetails.data?.cashFlowCa?.businessStockPurPerMonthWrapperDto.totalPurchasingPerMonth ?? 0 : cashFlowDetails.data?.cashFlowMfo?.businessStockPurPerMonthWrapperDto.totalPurchasingPerMonth ?? 0,
                                    },




                                ]}
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
                                                items={cashFlowDetails.data?.cashFlowMfo?.salesOperatingRevenueDto
                                                    ? itemsSalesOperation(cashFlowDetails.data?.cashFlowMfo?.salesOperatingRevenueDto) : []}
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
                                                    initialValue={cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto ? cashFlowDetails.data?.cashFlowCa?.salesOperatingRevenueDto.businessDayPerMonth : cashFlowDetails.data?.cashFlowMfo?.salesOperatingRevenueDto.businessDayPerMonth}
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        style={{ margin: 0 }}
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
                                                        value={cashFlowDetails.data?.salesOperatingRevenueDto ? cashFlowDetails.data?.salesOperatingRevenueDto.revenueInBusyDay.toFixed(2) : 0}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        precision={2}
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
                                                        precision={2}
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
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        className='w-full'
                                                        precision={2}
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
                                                        precision={2}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
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
                                                items={cashFlowDetails.data?.cashFlowMfo?.salesThreeDayCroscheckRevenueDto
                                                    ? itemsSalesRevenue3Day(cashFlowDetails.data?.cashFlowMfo?.salesThreeDayCroscheckRevenueDto) : []}
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
                                                        precision={2}
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
                                                        precision={2}
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
                                                        precision={2}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
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
                                                items={cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto
                                                    ? itemsSalesRevenueCash(cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto) : []}
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
                                                        precision={2}
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
                                                        disabled={true}
                                                        precision={2}
                                                        className='w-full'
                                                        style={{
                                                            color: 'black'
                                                        }}
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
                                                        precision={2}
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
                                                        precision={2}
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
                                                        precision={2}
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
                                                        precision={2}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />

                                {/* other incomes */}
                                <Row>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Total Other Income - MFO '
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Total Other Income - CA '
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className={
                                            screens.sm
                                                ? 'grid grid-cols-0 gap-0 pt-0'
                                                : 'grid grid-cols-0 gap-0 pt-0'
                                        }>
                                            {cashFlowDetails.data?.cashFlowMfo?.otherIncomeWrapperDto?.otherIncomeDtoList?.map((source: any, index: any) => {
                                                return <div
                                                    style={{ boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px' }}
                                                    className='px-0 pt-0 rounded-md  font-sans my-4'
                                                    key={index}
                                                >
                                                    <Descriptions
                                                        key={index}
                                                        column={
                                                            1
                                                        }
                                                        items={source ? itemsOtherIncome(source) : []}
                                                        size='small'
                                                    />

                                                </div>
                                            })}
                                        </div>


                                    </Col>
                                    <Col span={12}>
                                        <Form.List name="sources" initialValue={sourceDetails}>
                                            {(sourceDetails) => (
                                                <div className='mt-5'>
                                                    {sourceDetails?.map((source: any, index: any) => (
                                                        <div className={
                                                            screens.xs
                                                                ? 'px-6'
                                                                : 'flex justify-between px-0'
                                                        } key={index}>
                                                            <Form.Item
                                                                {...source}
                                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                                label="Source"
                                                                name={[source.name, "source"]}
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >

                                                                <Input

                                                                    className='w-full'
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...source}
                                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                                label="Amount"
                                                                name={[source.name, "amount"]}
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                <InputNumber
                                                                    precision={2}
                                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                    className='w-full'
                                                                />
                                                            </Form.Item>

                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </Form.List>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className='mt-5'>
                                            <Descriptions
                                                key={'totalOtherIncome'}
                                                column={screens.xs ?
                                                    1 : 1
                                                }
                                                items={[
                                                    {
                                                        key: 'totalOtherIncome',
                                                        label: 'Total Other Income',
                                                        children: <div className='font-bold'>
                                                            {getCurrency(cashFlowDetails.data?.cashFlowMfo?.otherIncomeWrapperDto?.totalOtherIncome)}
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
                                    </Col>
                                    <Col span={12}>
                                        <div className='mt-5'>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>

                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Total Other Income"
                                                    name='totalOtherIncome'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
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
                                            title='Gross Revenue per month - MFO'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title
                                            level={5}
                                            title='Gross Revenue per month - CA'
                                            style={{ color: '#7C3626' }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className='mt-4'>
                                            <Descriptions
                                                column={screens.xs ?
                                                    1 : 3
                                                }
                                                items={cashFlowDetails.data?.cashFlowMfo?.salesCashCroscheckRevenueDto
                                                    ? itemsGrossRevenue({
                                                        ...cashFlowDetails.data?.cashFlowMfo?.cashFlowFinalSummaryDto,
                                                        ...cashFlowDetails.data?.cashFlowMfo?.otherIncomeWrapperDto
                                                    }) : []}
                                                size='small'
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className='mt-4'>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Total Sales Revenue"
                                                    name='grossRevenuePerMonth'
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Total Other Income"
                                                    name='totalOtherIncome'

                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
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
                                        <div
                                            className='mt-4'
                                        >
                                            {cashFlowDetails.data?.cashFlowMfo?.businessStockPurPerMonthWrapperDto?.businessStockPurPerMonthDtoList?.map((stock: any, index: any) => {
                                                return <Descriptions
                                                    key={index}
                                                    column={screens.xs ?
                                                        1 : 3
                                                    }
                                                    items={stock ? itemsBusinussStock(stock) : []}
                                                    size='small'
                                                />
                                            })}
                                        </div>

                                    </Col>
                                    <Col span={12}>
                                        <Form.List name="stocks" initialValue={stockDetails}>
                                            {(stockDetails) => (
                                                <div className='mt-5'>
                                                    {stockDetails.map((stock) => (
                                                        <Space
                                                            key={stock.key}
                                                            style={{ display: "flex", marginBottom: 8 }}
                                                            align="baseline"
                                                        >
                                                            <div className={
                                                                screens.xs
                                                                    ? 'px-6'
                                                                    : 'flex justify-between px-0'
                                                            } >
                                                                <Form.Item
                                                                    {...stock}
                                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                                    label="Stock Name"
                                                                    name={[stock.name, "stockName"]}
                                                                    fieldKey={[stock.fieldKey, 'stockName']}
                                                                    style={{
                                                                        fontWeight: 600,
                                                                    }}
                                                                >

                                                                    <Input


                                                                        className='w-full'
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...stock}
                                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                                    label="Purchasing Price"
                                                                    name={[stock.name, "purchasingPrice"]}
                                                                    fieldKey={[stock.fieldKey, 'purchasingPrice']}
                                                                    style={{
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    <InputNumber
                                                                        precision={2}
                                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                        className='w-full'
                                                                    />
                                                                </Form.Item>
                                                            </div>
                                                        </Space>
                                                    ))}
                                                </div>
                                            )}
                                        </Form.List>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className='mt-4'>
                                            <Descriptions
                                                key={'totalPurchasingPerMonth'}
                                                column={screens.xs ?
                                                    1 : 1
                                                }
                                                items={[
                                                    {
                                                        key: 'totalPurchasingPerMonth',
                                                        label: 'Total Purchasing per Month',
                                                        children: <div className='font-bold'>
                                                            {getCurrency(cashFlowDetails.data?.cashFlowMfo?.businessStockPurPerMonthWrapperDto?.totalPurchasingPerMonth)}
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
                                    </Col>
                                    <Col span={12}>
                                        <div className='mt-4'>
                                            <div className={
                                                screens.xs
                                                    ? 'px-6'
                                                    : 'flex justify-between px-0'
                                            }>
                                                <Form.Item
                                                    className={screens.xs ? 'w-full' : 'w-1/2'}
                                                    label="Total Purchasing per Month"
                                                    name='totalPurchasingPerMonth'
                                                    style={{
                                                        color: '#102C57',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <InputNumber
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
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
                                            items={cashFlowDetails.data?.cashFlowMfo?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0]
                                                ? itemsTotalExpenseB(
                                                    cashFlowDetails.data?.cashFlowMfo?.businessExpPerMonthWrapperDto?.businessExpPerMonthDtoList?.[0]
                                                ) : []}
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
                                                label="Transport"
                                                name='bnsTransportationExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    precision={2}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Utility"
                                                name='bnsUtilitiesExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    precision={2}
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
                                                    precision={2}
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
                                                    precision={2}
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
                                                name='bnsOtherExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    precision={2}
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
                                            items={cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0]
                                                ? itemsTotalExpenseH(
                                                    cashFlowDetails.data?.cashFlowMfo?.houseHoldExpPerMonthWrapperDto?.houseHoldExpPerMonthDtoList?.[0]
                                                ) : []}
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
                                                    precision={2}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Transport"
                                                name='houseHoldTransportationExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    precision={2}
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
                                                name='houseHoldUtilitiesExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    precision={2}
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
                                                    precision={2}
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
                                                    precision={2}
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
                                                    precision={2}
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
                                                    precision={2}
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    className='w-full'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className={screens.xs ? 'w-full' : 'w-1/2'}
                                                label="Other"
                                                name='houseHoldOtherExpense'
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <InputNumber
                                                    precision={2}
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
                                                items={cashFlowDetails.data?.cashFlowMfo?.cashFlowFinalSummaryDto
                                                    ? itemsSummary(
                                                        cashFlowDetails.data?.cashFlowMfo?.cashFlowFinalSummaryDto
                                                    ) : []}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
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
                                                        precision={2}
                                                        formatter={(value) =>
                                                            `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        className='w-full'
                                                        disabled={true}
                                                        style={{
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <Row>
                                    <Col span={24}>
                                        <div className='flex justify-end mt-4'>
                                            <Button type="primary" size='large'
                                                disabled={
                                                    (selectedRole !== 'CA') ? true : false
                                                }
                                                shape="round" htmlType="submit">
                                                Submit
                                            </Button>
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
