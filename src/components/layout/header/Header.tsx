import React, {useContext, useState} from 'react';
import { Button, Layout, theme } from 'antd';
import { MenuUnfoldOutlined, 
    MenuFoldOutlined,
    SettingOutlined,
  } from '@ant-design/icons';
import ThemeSettingModel from './ThemeSettingModel';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';

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
    
    const [showSettings, setShowSettings] = useState(false)

    const {logOut,login} = useContext<IAuthContext>(AuthContext)


  return (
    <Header 
        style={{
        ...headerStyle,
        backgroundColor: colorBgContainer,
        boxShadow: boxShadow,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
        }}
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
        <Button
            type="text"
            icon={<SettingOutlined/>}
            onClick={() => {
              logOut('', '/logout')
              login()
            }}
            style={{
            margin: 0,
            }}
        />
    </Header>
  );
}
