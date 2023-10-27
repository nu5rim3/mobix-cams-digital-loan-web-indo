
import { 
    DashboardOutlined,
    UserOutlined,
    FileDoneOutlined,
    NotificationOutlined
  } from '@ant-design/icons';
import UnderConstruction from '../pages/underConstruction/UnderConstruction';
import UserManagement from '../pages/userManagement/UserManagement';
import UserForm from '../pages/userManagement/UserForm';
import SlikRequests from '../pages/slikRequests/SlikRequests';
import UpdateSlikRequest from '../pages/slikRequests/nonPendingSlik/updateSlikRequest/UpdateSlikRequest';
import Applications from '../pages/applications/Applications';
import ApplicationView from '../pages/applications/applicationView/ApplicationView';

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
        path: "/",
        label: 'Dashboard',
        key: '/',
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
        type: "LINK",
        label: 'Applications',
        path:'/applications',
        key: '/applications',
        icon: <FileDoneOutlined/>,
        visibleInMenu: true,
        children: [ {
            type: "LINK",
            path:'/applications',
            key: '/applications',
            visibleInMenu: false,
            component: Applications,
        },
        {
            type: "LINK",
            path:'/applications/viewApplication/:id',
            // label: 'Test Sub 2',
            key: '/applications/viewApplication/:id',
            visibleInMenu: false,
            component: ApplicationView,
        },],
    },
    {
        type: "LINK",
        path: "/slikRequest",
        label: 'SLIK Requests',
        key: '/slikRequest',
        icon: <DashboardOutlined/>,
        visibleInMenu: true,
        // component: SlikRequests,
        children: [ 
            {
                type: "LINK",
                path:'/slikRequest',
                key: '/slikRequest',
                visibleInMenu: false,
                component: SlikRequests,
            },
            {
                type: "LINK",
                path:'/slikRequest/updateSlik/:id',
                key: '/updateSlik/:id',
                visibleInMenu: false,
                component: UpdateSlikRequest,
            },
        ],
    },
    {
        type: "LINK",
        path:'/test',
        label: 'Reports',
        key: 'Reports',
        visibleInMenu: true,
        icon: <NotificationOutlined/>,
    }

]

export default sidebarMenu