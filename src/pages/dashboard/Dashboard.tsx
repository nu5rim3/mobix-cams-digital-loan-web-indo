import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../store/store';
import { API } from '../../services/Services';
import { ResponsivePie } from '@nivo/pie'

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
                    > Number of registered users 
                    </div>

                    <div className='w-full  p-10 flex justify-center text-6xl font-semibold bg-blue-100'>
                        {data?.length}
                    </div>
                </div>

                <div>
                <ResponsivePie
                        data={[
                            {
                            "id": "java",
                            "label": "java",
                            "value": 552,
                            "color": "hsl(100, 70%, 50%)"
                            },
                            {
                            "id": "elixir",
                            "label": "elixir",
                            "value": 186,
                            "color": "hsl(109, 70%, 50%)"
                            },
                            {
                            "id": "c",
                            "label": "c",
                            "value": 321,
                            "color": "hsl(184, 70%, 50%)"
                            },
                            {
                            "id": "hack",
                            "label": "hack",
                            "value": 499,
                            "color": "hsl(123, 70%, 50%)"
                            },
                            {
                            "id": "css",
                            "label": "css",
                            "value": 492,
                            "color": "hsl(16, 70%, 50%)"
                            }
                        ]}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    0.2
                                ]
                            ]
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    2
                                ]
                            ]
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'ruby'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'c'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'go'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'python'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'scala'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'lisp'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'elixir'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'javascript'
                                },
                                id: 'lines'
                            }
                        ]}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            {/* } */}

      </div>
    </div>
  );
}
