import type { MenuProps, MenuTheme } from 'antd/es/menu';
import { 
    DashboardOutlined,
    UserOutlined,
    FileDoneOutlined,
    NotificationOutlined
  } from '@ant-design/icons';
import UnderConstruction from '../pages/UnderConstruction/UnderConstruction';
import UserManagement from '../pages/userManagement/UserManagement';
import UserForm from '../pages/userManagement/UserForm';

export interface MenuItem {
    type: "LINK" | "GROUP";
    path: string;
    label?: string;
    key: string;
    icon?: JSX.Element;
    breadcrumb?: {
        title: string;
        description?: string;
    };
    component?: (props: any) => JSX.Element | any;
    children?: MenuItem[];
    visibleInMenu?: boolean;
    authorization?: any;
    index? : boolean;
    allowedRoles?: string[]
}

const sidebarMenu: MenuItem[] = [
    {
        type: "LINK",
        path: "/indo-digital-loan",
        label: 'Dashboard',
        key: '/indo-digital-loan',
        icon: <DashboardOutlined/>,
        breadcrumb: {
            title: "Dashboard"
        },
        component: UnderConstruction,
        visibleInMenu: true,
        
    },
    {
        type: "LINK",
        path: "/userManagement",
        label: 'User Management',
        key: '/userManagement',
        icon: <UserOutlined/>,
        visibleInMenu: true,
        allowedRoles: ['MFO','CA','BM','AM','RM','DIR'],
        children: [ 
            {
                type: "LINK",
                path:'/userManagement',
                key: '/userManagement',
                visibleInMenu: false,
                component: UserManagement,
            },
            {
                type: "LINK",
                path:'/userManagement/createUser',
                key: '/createUser',
                visibleInMenu: false,
                component: UserForm,
            },
            {
                type: "LINK",
                path:'/userManagement/updateUser/:id',
                key: '/updateUser/:id',
                visibleInMenu: false,
                component: UserForm,
            },
        ],
    },
    {
        type: "GROUP",
        label: 'Applications',
        path:'/applications',
        key: '/applications',
        icon: <FileDoneOutlined/>,
        visibleInMenu: true,
        children: [ {
            type: "LINK",
            path:'/applications',
            label: 'Test Sub 1',
            key: 'est Sub 1',
            visibleInMenu: true,
            component: UnderConstruction,
        },
        {
            type: "LINK",
            path:'/applications/test2',
            label: 'Test Sub 2',
            key: 'Test Sub 2',
            visibleInMenu: true,
            component: UnderConstruction,
        },],
    },
    {
        type: "LINK",
        path: "/slickRequest",
        label: 'Slick Requests',
        key: 'slickRequest',
        icon: <DashboardOutlined/>,
        visibleInMenu: true,
        component: UnderConstruction,
    },
    {
        type: "LINK",
        path:'/test',
        label: 'Reports',
        key: 'Reports',
        icon: <NotificationOutlined/>,
    }

]

export default sidebarMenu
