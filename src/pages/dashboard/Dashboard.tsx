import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../store/store';
import { API } from '../../services/Services';
import { ResponsivePie } from '@nivo/pie'
import LineChart from './LineChart';
import PieChart from './PieChart';
import ContentContainer from '../../components/Containers/ContentContainer';
import GoogleVis from '../../components/GoogleMap/GoogleVis';
import { Grid } from 'antd';

export interface IDashboardProps {
}

export default function Dashboard (props: IDashboardProps) {

    const {
        usersData
      } = useSelector((state: any) => state.DashboardData)
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const [data, setData] = useState<any[] | null>(null)

    const getData = async () => {
        const response = await API.userServices.getAllUsers()
        setData(response.data.content)
        actions.getAllUsersData()
    }

    useEffect( () => {
        getData()
    },[])
      
  return (
    <ContentContainer >
        <div className={screens.xs? '' : 'grid grid-cols-2 gap-5 pt-2'}>
            <div 
                className='p-5 rounded-md '
            >
                <div
                        style={{
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }} 
                    className='w-full rounded-md'
                >
                    <div
                        className={screens.xs? 'p-4 text-l font-semibold' : 'p-4 text-xl font-semibold'}
                    > Number of Total Pending Applications
                    </div>

                    <div className='w-full  p-5 flex justify-center text-5xl font-semibold bg-teal-50'>
                        {/* {data?.length} */}
                        52
                    </div>
                </div>
            </div>

            <div className=' p-5 rounded-md'>
                                {/*  */}
                <div
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }} 
                    className='w-full rounded-md'
                >
                    <div
                        className={screens.xs? 'p-4 text-l font-semibold' : 'p-4 text-xl font-semibold '}
                    > Number of Registered Users 
                    </div>

                    <div className='w-full  p-5 flex justify-center text-5xl font-semibold bg-teal-50'>
                        {data?.length}
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center bg-fuchsia-100 p-2 rounded-md'>
                <LineChart/>
            </div>
            <div className={screens.xs? 'flex justify-center items-center bg-fuchsia-100 rounded-md mt-2' 
            :'flex justify-center items-center bg-fuchsia-100 rounded-md'}>
                <PieChart/>
            </div>
        </div>
    </ContentContainer>
  );
}
