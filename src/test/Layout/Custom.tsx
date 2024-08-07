import React, { useState, useContext } from 'react';
import { Button, ColorPicker, ConfigProvider, Divider, Grid, Layout, Menu, Modal, Space, Switch, theme } from 'antd';
import {
  LaptopOutlined,
  NotificationOutlined, UserOutlined, MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  HomeOutlined
} from '@ant-design/icons';
import TestComponents from '../TestComponents';
import TestComponents2 from '../TestComponents2';
import TestComponents3 from '../TestComponents3';

import { AuthContext, IAuthContext, AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"

import pkJson from '../../../package.json';

import UserManagement from '../../pages/userManagement/UserManagement';
import SideBar from '../../components/layout/sidebar/SideBar';
import ThemeBlueWhite from '../../themes/ThemeBlueWhite';
import HeaderContainer from '../../components/layout/header/Header';

const { Header, Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  // textAlign: 'center',
  // minHeight: 120,
  // lineHeight: '120px',
  // color: '#ffd',
  overflow: 'auto',
  width: '100%',
  // backgroundColor: '#fff',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  // color: '#fff',
  //   backgroundColor: '#3ba0e9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'right',
  //   color: '#fff',
  // backgroundColor: '#DDF',
  //   paddingInline: 0,
  //   lineHeight: 0,
  height: 30,
  padding: 5,
  paddingRight: 20,
  fontWeight: 800
};



const App: React.FC<{
  handleTheme: any,
  primary: any,
  setPrimary: any
}
> = (
  props
) => {

    const {
      token: { colorBgContainer, boxShadow, colorBgLayout, colorBgElevated },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    // const [theme, setTheme] = useState('Light') 

    const setNewTheme = () => {

    }

    // const {token, tokenData, logOut, error, idToken, idTokenData, loginInProgress, login} = useContext<IAuthContext>(AuthContext)

    return (
      <Layout
        style={{
          'height': '100vh'
        }}
      >
        <ThemeBlueWhite>
          <SideBar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </ThemeBlueWhite>

        <Layout>
          <HeaderContainer
            {...props} // send to redux
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <Content style={contentStyle} className='p-6'>
            <UserManagement />
          </Content>
          <Footer
            style={{
              ...footerStyle,
              backgroundColor: colorBgContainer,
            }}
          >v {pkJson.version}</Footer>
        </Layout>
      </Layout>
    )
  };

export default App;