import React, {useEffect, useState} from 'react';
import digitalMe from '../../../assets/digitalMe.png'
import { Button, Grid, Layout, Menu,
    theme,
    MenuProps
 } from 'antd';
import { MenuUnfoldOutlined, 
    MenuFoldOutlined,
  } from '@ant-design/icons';
import { MenuItem } from '../../../routes/navigation';
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
            onClick: () => {
              if(row.type === "LINK"){
                navigate(row.path)
                if(screens.xs){
                  setCollapsed(!collapsed)
                }
              }
            }
        }
        })
      return menu
    }(navigation);

    useEffect(() => {
      if(screens.xs){
        setCollapsed(true)
      }
    },[])
  
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
            >
              {screens.xs?
                <div className='pt-3'>
                  <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined size={20}/> : <MenuFoldOutlined size={25}/>}
                    onClick={() => 
                      setCollapsed(!collapsed)
                      // logOut('', '/logout')
                    }
                    size='large'
                  />
                </div>
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
