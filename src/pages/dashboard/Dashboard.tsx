import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../store/store';
import { API } from '../../services/Services';

export interface IDashboardProps {
}

export default function Dashboard (props: IDashboardProps) {

    const {
        usersData
      } = useSelector((state: any) => state.DashboardData)

    const [data, setData] = useState<any[] | null>(null)

    const getData = async () => {
        const response = await API.userServices.getAllUsers()
        setData(response.data.content)
        actions.getAllUsersData()
    }

    useEffect( () => {
        getData()
    },[])
      
    console.log("usersdata", data)
  return (
    <div>
        <div 
           
            className='p-5 rounded-md'
        >
            {/* {usersData?.fetching?
                'loading'
            : */}
                <div
                     style={{
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }} 
                    className='w-1/3 rounded-md'
                >
                    <div
                        className='p-4 text-3xl font-semibold '
                    > User Count
                    </div>

                    <div className='w-full  p-10 flex justify-center text-6xl font-semibold'>
                        {data?.length}
                    </div>
                </div>
            {/* } */}

      </div>
    </div>
  );
}
