import { Button, Grid, Layout } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Title from '../../components/Typography/Tytle';
import { actions } from '../../store/store';
import digitalMe from '../../assets/digitalMe.png'
import { RightOutlined } from '@ant-design/icons'

export interface ISelectUserRoleProps {
}

export default function SelectUserRole(props: ISelectUserRoleProps) {

    const { Content } = Layout;
    const [clickedRole, setClickedRole] = useState<null | any>(null)
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const {
        userData,
        selectedRole
    } = useSelector((state: any) => state.AppData)
    return (
        <Layout
            style={{
                'height': '100vh'
            }}
            className={screens.xs ? '' : 'flex flex-row '}
        >
            <div className={screens.xs ? 'w-full flex justify-center items-center' : 'w-1/2 flex justify-center items-center shadow-xl'}>
                <img className={screens.xs ? 'w-44 m-10' : 'w-80'} src={digitalMe} />
            </div>

            <div className={screens.xs ? '' : 'w-1/2 p-20'}>
                <div className={'text-center'}>
                    <Title title='Select A User Role to Continue' level={3} />
                </div>

                <div className='h-96  p-5 flex justify-center items-center '>
                    {userData?.data?.roles?.map((role: any) => {
                        return <div
                            key={role?.description}
                            className={`${clickedRole?.code == role?.code ? 'bg-blue-100' : ''} bg-white w-32 h-32 rounded-md flex justify-center items-center cursor-pointer shadow-md hover:shadow-xl mx-2 p-2`}
                            onClick={() => {
                                actions.setRole(role.code)
                                localStorage.setItem('selectedRole', role.code)
                            }}
                        >
                            <Title title={
                                role.description
                                // 'Customer Service Assistence'
                            }
                                level={5}
                                style={{
                                    textAlign: 'center'
                                }}
                            />
                        </div>
                    })}
                </div>
            </div>
        </Layout>
    );
}
