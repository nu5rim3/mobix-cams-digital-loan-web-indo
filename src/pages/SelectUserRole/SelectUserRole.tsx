import { Button, Layout } from 'antd';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Title from '../../components/Typography/Tytle';
import { actions } from '../../store/store';

export interface ISelectUserRoleProps {
}

export default function SelectUserRole (props: ISelectUserRoleProps) {
    const {Content} = Layout;
    const [clickedRole, setClickedRole] = useState<null | any>(null)

    const {
        userData,
        selectedRole
    } = useSelector((state: any) => state.AppData)
      console.log(userData)
  return (
    <Layout
    style={{
        'height': '100vh'
    }}
    className='flex justify-center items-center'
>
    <div className='my-7'>
        <Title title='Select User Role' level={3}/>
    </div>

    {userData?.data?.roles?.map((role:any) => {
        console.log("test role", role)
        return <div
            key={role?.description}
            className={`${clickedRole?.code == role?.code? 'bg-blue-100' :''} w-32 h-32 rounded-md flex justify-center items-center cursor-pointer shadow-md hover:shadow-xl`}
            // style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
            onClick={() => {
                setClickedRole(role.code)
            }}
        >
            <Title title={role.description} level={5}/>
        </div>
    })}
    <div className='m-5' onClick={() => {
        actions.setRole(clickedRole)
        localStorage.setItem('selectedRole', clickedRole)
    }}>
        <Button size='large' disabled={!clickedRole}>Countinue</Button>
    </div>
    </Layout>
  );
}
