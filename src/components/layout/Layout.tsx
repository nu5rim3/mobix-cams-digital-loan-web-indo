/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Layout } from 'antd';
import ThemeBlueWhite from '../../themes/ThemeBlueWhite';
import SideBar from './sidebar/SideBar';
import HeaderContainer from './header/Header';
import FooterContainer from './footer/Footer';
import navigation, { MenuItem } from '../../routes/navigation';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';
import { setAxiosToken } from '../../services/config';
import jwt_decode from 'jwt-decode';
import { actions } from '../../store/store';
import { useSelector } from 'react-redux';
import SelectUserRole from '../../pages/SelectUserRole/SelectUserRole';
import MainLoading from '../../pages/MainLoading/MainLoading';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
    overflow: 'auto',
    width: '100%',
};

export interface ILayoutProps {
    handleTheme: any,  //take in to redux
    primary: any,
    setPrimary: any
}

export default function LayoutContainer(props: ILayoutProps) {

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const userData = useSelector((state: any) => state.AppData.userData.data)
    const selectedRoleStore = useSelector((state: any) => state.AppData.selectedRole)

    const selectedRole = localStorage.getItem('selectedRole')
    const navigate = useNavigate();

    const routes = function menuItems(params: MenuItem[] | undefined): any {
        if (!params || !userData) return
        if (!params) return

        // roles,permission check can be done here if needed
        const roles = userData?.roles?.map((role: any) => role.code)
        const route = params
            .filter((routes) => {
                if (!routes.allowedRoles) return true
                return routes.allowedRoles?.some(element => roles.includes(element));
            })
            .map((row, index) => {
                return {
                    key: row.key,
                    path: row.path,
                    component: row.component,
                    children: menuItems(row.children),
                    index: row.index
                }
            })
        return route
    }(navigation);

    const { token, loginInProgress, idToken } = useContext<IAuthContext>(AuthContext)

    useEffect(() => {
        if (!loginInProgress && !token) {
            // login()
            navigate('/indo-digital-loan/logout')

        }
        if (token) {
            const decoded = jwt_decode(token) as any;
            setAxiosToken(token, decoded.sub)
            actions.setToken({
                token,
                tokenData: idToken
            })
            actions.getUserDataById(decoded.sub)
        }

    }, [loginInProgress])

    useEffect(() => {
        if (selectedRole) {
            actions.setRole(selectedRole)
        }
    }, [])

    return (
        <>
            {
                loginInProgress || !token || !userData ?
                    <MainLoading />
                    : !selectedRole
                        ?
                        <SelectUserRole />
                        :
                        <Layout
                            style={{
                                'height': '100vh'
                            }}
                        >
                            <ThemeBlueWhite>
                                <SideBar
                                    collapsed={collapsed}
                                    setCollapsed={setCollapsed}
                                    userData={userData}
                                />
                            </ThemeBlueWhite>

                            <Layout>
                                <HeaderContainer
                                    {...props} // send to redux
                                    collapsed={collapsed}
                                    setCollapsed={setCollapsed}
                                />
                                <Content style={contentStyle} className={screens.xs ? 'p-3' : 'px-6 py-3'}>

                                    <Routes>
                                        {routes.map((route: any) => {
                                            if (!route.children) {
                                                return <Route key={route.key} path={route.path} Component={route.component} />
                                            } else {
                                                return <Route path={route.path} key={route.key}>
                                                    {route.children.map((chi: any) => {
                                                        return <Route key={chi.key} path={chi.path} Component={chi.component} />
                                                    })}
                                                </Route>
                                            }
                                        })}
                                    </Routes>
                                </Content>
                                <FooterContainer />
                            </Layout>
                        </Layout>
            }
        </>
    );
}
