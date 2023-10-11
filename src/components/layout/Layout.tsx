import React, {useContext, useEffect, useState} from 'react';
import { Button, ColorPicker, ConfigProvider, Divider, Grid, Layout, Menu, Modal, Space, Switch, theme } from 'antd';
import ThemeBlueWhite from '../../themes/ThemeBlueWhite';
import SideBar from './sidebar/SideBar';
import HeaderContainer from './header/Header';
import UserManagement from '../../pages/userManagement/UserManagement';
import FooterContainer from './footer/Footer';
import navigation, { MenuItem } from '../../routes/navigation';
import { Route, Routes } from 'react-router-dom';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';
import DotWave from '../loaders/DotWave';
import digitalMe from '../../assets/digitalMe.png'
import { setAxiosToken } from '../../services/config';
import { API } from '../../services/Services';
import jwt_decode from 'jwt-decode';

const { Header, Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
    overflow: 'auto',
    width: '100%',
  };

export interface ILayoutProps {
    handleTheme : any,  //take in to redux
    primary: any, 
    setPrimary: any
}

export default function LayoutContainer (props: ILayoutProps) {

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>();
    const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
    // const [routes, setRoutes] = useState([])

    const routes = function menuItems(params: MenuItem[] | undefined) : any  {
        if(!params || !userData) return
  
        // roles,permission check can be done here if needed
        const roles = userData?.roles?.map((role:any) => role.code)
        const route = params
        .filter((routes) => {
            if(!routes.allowedRoles) return true
            return routes.allowedRoles.some(element => roles.includes(element));
        })
        .map((row, index) => {
            return {
                key: row.key,
                path: row.path,
                component: row.component,
                children:  menuItems(row.children),
                index: row.index
            }
            })
        return route
      }(navigation);

      const {token, loginInProgress, login} = useContext<IAuthContext>(AuthContext)

      useEffect(() => {
        if(!loginInProgress && !token){
            login()
        }
        if(token){
            setAxiosToken(token)
            var decoded = jwt_decode(token);
            getUserData(decoded)
        }

      }, [loginInProgress])

      const getUserData = async (tokenData: any) => {
        const userData = await API.userServices.getUserById(tokenData.sub)
        setUserData(userData.data)
        // generateNavigation()
      } 

  return (
    <>
        {
            loginInProgress || !token || !userData?
                <div className='w-screen h-screen bg-white flex flex-col justify-center items-center'>
                        {/* <img src={digitalMe} className='w-2/12 p-6'/> */}
                        <h2 className='p-8 font-sans text-6xl antialiased'>Digital-Me</h2>
                        <DotWave/>
                </div>
           
        : 
            <Layout
                style={{
                    'height': '100vh'
                }}
            >
                <ThemeBlueWhite>
                    <SideBar
                        collapsed = {collapsed}
                        setCollapsed={setCollapsed}
                        userData = {userData}
                    />
                </ThemeBlueWhite>

            <Layout>
                <HeaderContainer 
                    {...props} // send to redux
                    collapsed = {collapsed}
                    setCollapsed={setCollapsed}
                />
                <Content style={contentStyle} className={screens.xs? 'p-3' : 'p-6'}>
                    
                    <Routes>
                        {routes.map((route:any) => {
                            if(!route.children){
                                return <Route key={route.key} path={route.path} Component={route.component}/>
                            }else{
                                return <Route path={route.path} key={route.key}>
                                    {route.children.map((chi: any) => {
                                        return <Route key={chi.key} path={chi.path} Component={chi.component}/>
                                    })}
                                </Route>
                            }
                        })}
                    </Routes>
                </Content>
                <FooterContainer/>
            </Layout>
            </Layout>
        }
    </>
  );
}
