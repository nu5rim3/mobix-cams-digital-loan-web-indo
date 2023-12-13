import React, {useContext, useState} from 'react';
import { Button, Dropdown, Layout, MenuProps, Tag, theme } from 'antd';
import { MenuUnfoldOutlined, 
    MenuFoldOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
import ThemeSettingModel from './ThemeSettingModel';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';
import { useSelector } from 'react-redux';
import { actions } from '../../../store/store';

const { Header} = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'left',
    paddingInline: 8,
    lineHeight: 4,
    height: 50
  };

export interface IHeaderContainerProps {
    collapsed: boolean
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
    handleTheme : any,  // take these to redux
    primary: any, 
    setPrimary: any
}

export default function HeaderContainer({ 
    collapsed,
    setCollapsed,
    ...props // take these to redux
}: IHeaderContainerProps) {

    const {
        token: { colorBgContainer, boxShadow, colorBgLayout, colorBgElevated },
      } = theme.useToken();

    const {
      token,
      tokenData,
      userData,
      selectedRole
    } = useSelector((state:any) => state.AppData)
    
    const [showSettings, setShowSettings] = useState(false)

    const {logOut,login} = useContext<IAuthContext>(AuthContext)

    const handleMenuClick: MenuProps['onClick'] = (e) => {
     
    };
    
    const items:  (data: any) => MenuProps['items'] = (data) => [
      {
        label: <>{data?.fullName}</>,
        key: '1',
        icon: <UserOutlined />,
        disabled: true
      },
      {
        label: 'Log Out',
        key: '2',
        icon: <LogoutOutlined />,
        onClick: () => {
          localStorage.removeItem('selectedRole')
          localStorage.clear()
          sessionStorage.clear()
          actions.restAppData()
          logOut() 
          // window.location.replace(`${import.meta.env.VITE_LOGOUT_URI}/logout?id_token_hint=${token}&post_logout_redirect_uri=${import.meta.env.VITE_REDIRECT_BACK_CHANEL_LOGOUT_URL}`)
        }
      }
    ];

    const menuProps = {
      items,
      onClick: handleMenuClick,
    };

    const {
      customerData
  } = useSelector((state: any) => state.Application)

  return (
    <Header 
        style={{
        ...headerStyle,
        backgroundColor: colorBgContainer,
        boxShadow: boxShadow,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottom: '0.5px solid gray'
        }}
        // className='border-zinc-500'
    >
        <ThemeSettingModel
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            {...props}
        />
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
            margin: 0,
            }}
        />
        {/* <Button
            type="text"
            icon={<SettingOutlined/>}
            onClick={() => {
              logOut('', '/logout')
              login()
            }}
            style={{
            margin: 0,
            }}
        /> */}
        {/* <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}></Dropdown.Button> */}
        <Tag color='geekblue'>{userData.data.idx} - {selectedRole}</Tag>
        <div>
          <Dropdown menu={{ items: customerData? items(customerData): [] }} placement="bottomLeft">
            <Button  icon={<UserOutlined/>}></Button>
          </Dropdown>
        </div>
    </Header>
  );
}
