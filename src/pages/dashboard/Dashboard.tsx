/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { actions } from '../../store/store';
import { API } from '../../services/Services';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ContentContainer from '../../components/Containers/ContentContainer';
import { Grid } from 'antd';

export interface IDashboardProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Dashboard(_props: IDashboardProps) {

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const [data, setData] = useState<any[] | null>(null)

    const getData = async () => {
        const response = await API.userServices.getAllUsers()
        setData(response.data.content)
        actions.getAllUsersData()
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <ContentContainer >
            <div className={screens.xs ? '' : 'grid grid-cols-2 gap-5 pt-2'}>
                <div className='bg-gray-50 rounded-md p-4 shadow-lg'>
                    <div
                        className={screens.xs ? 'text-l font-semibold text-center mb-2' : 'text-xl font-semibold text-center mb-2'}
                    > Number of Total Pending Applications
                    </div>
                    <div className='w-full  p-5 flex justify-center text-5xl font-semibold bg-teal-100 rounded-md'>
                        52
                    </div>
                </div>
                <div className='bg-gray-50 rounded-md p-4 shadow-lg'>
                    <div
                        className={screens.xs ? 'text-l font-semibold text-center mb-2' : 'text-xl font-semibold text-center mb-2'}
                    >Number of Registered Users
                    </div>
                    <div className='w-full  p-5 flex justify-center text-5xl font-semibold bg-teal-100 rounded-md'>
                        {data?.length}
                    </div>
                </div>
                <div className='flex justify-center items-center bg-fuchsia-100 p-2 rounded-md'>
                    <LineChart />
                </div>
                <div className={screens.xs ? 'flex justify-center items-center bg-fuchsia-100 rounded-md mt-2'
                    : 'flex justify-center items-center bg-fuchsia-100 rounded-md'}>
                    <PieChart />
                </div>
            </div>
        </ContentContainer>
    );
}
