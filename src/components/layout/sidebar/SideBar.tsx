import React, {useState} from 'react';
import digitalMe from '../../../assets/digitalMe.png'
import { Button, 
    ColorPicker, ConfigProvider, Divider, Grid, Layout, Menu, Modal, Space, Switch, 
    theme,
    MenuProps
 } from 'antd';
import { 
    LaptopOutlined, 
    NotificationOutlined, UserOutlined, MenuUnfoldOutlined, 
    MenuFoldOutlined,
    SettingOutlined,
    HomeOutlined
  } from '@ant-design/icons';
import sidebarMenu, { MenuItem } from '../../../routes/navigation';
import navigation from '../../../routes/navigation';
import { useLocation, useNavigate } from "react-router-dom";

const iconStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    lineHeight: 4,
    height: 70,
  };

export interface ISideBarProps {
    collapsed : boolean,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    userData: any
}

export default function SideBar ({
    collapsed,
    setCollapsed,
    userData
}: ISideBarProps) {

    const { Sider } = Layout;
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const roles = userData.roles.map((role:any) => role.code)

    const {
        token: { colorBgContainer, boxShadow},
      } = theme.useToken();

    let location = useLocation();

    const menu = function menuItems(params: MenuItem[] | undefined) : MenuProps['items']  {
      if(!params) return

      // roles,permission check can be done here if needed
      const menu = params
      .filter(({visibleInMenu}) => visibleInMenu)
      .filter((routes) => {
        if(!routes.allowedRoles) return true
        return routes.allowedRoles.some(element => roles.includes(element));
      })
      .map((row, index) => {
        return {
            key: row.key,
            icon: row.icon,
            label: row.label,
            children: row.type === "GROUP"? menuItems(row.children): null,
            onClick: () =>  row.type === "LINK"? navigate(row.path): null
        }
        })
      return menu
    }(navigation);
  
    return (
        <Sider 
            width={250} 
            collapsedWidth={screens.xs? 0 : undefined}
            collapsed={collapsed}
            style={{
                position: screens.xs? 'fixed' : 'relative',
                background: colorBgContainer, 
                overflow: 'auto',
                height: '100vh',
                boxShadow: boxShadow,
                zIndex: 2
            }}
            // onBreakpoint={(b) => {
            //   return console.log("b", b)
            // }}
            // style={siderStyle}
            >
              {screens.xs?
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => 
                    setCollapsed(!collapsed)
                    // logOut('', '/logout')
                  }
                  style={{
                    margin: 0,
                  }}
                />
              : null}

                {
                  !collapsed ?
                    <div style={iconStyle}>
                      <img src={digitalMe} />
                    </div>
                  : null
                }
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    style={{ 
                      borderRight: 0 , 
                      fontWeight: 600
                    }}
                    items={menu}
                />
        </Sider>
  );
}
