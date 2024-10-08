
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
import ViewSlikRequest from '../pages/slikRequests/nonPendingSlik/viewSlikRequest/ViewSlikRequest';
import Applications from '../pages/applications/Applications';
import ApplicationView from '../pages/applications/applicationView/ApplicationView';
import InternalCrib from '../pages/applications/internalCrib/InternalCrib';
import Applications2ndStep from '../pages/applications/Applications2ndStep';
import Dashboard from '../pages/dashboard/Dashboard';

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
    index?: boolean;
    allowedRoles?: string[]
}

const sidebarMenu: MenuItem[] = [
    {
        type: "LINK",
        path: "/",
        label: 'Dashboard',
        key: '/',
        icon: <DashboardOutlined />,
        breadcrumb: {
            title: "Dashboard"
        },
        component: Dashboard,
        visibleInMenu: true,

    },
    {
        type: "LINK",
        path: "/userManagement",
        label: 'User Management',
        key: '/userManagement',
        icon: <UserOutlined />,
        visibleInMenu: true,
        allowedRoles: ['ADMIN'],
        children: [
            {
                type: "LINK",
                path: '/userManagement',
                key: '/userManagement',
                visibleInMenu: false,
                component: UserManagement,
            },
            {
                type: "LINK",
                path: '/userManagement/createUser',
                key: '/createUser',
                visibleInMenu: false,
                component: UserForm,
            },
            {
                type: "LINK",
                path: '/userManagement/updateUser/:id',
                key: '/updateUser/:id',
                visibleInMenu: false,
                component: UserForm,
            },
        ],
    },
    {
        type: "LINK",
        label: 'Applications',
        path: '/applications',
        key: '/applications',
        icon: <FileDoneOutlined />,
        visibleInMenu: true,
        allowedRoles: ['CSA', 'CA', 'AM', 'RM', 'DIR', 'BOD1', 'BOD2', 'BOD3'],
        children: [{
            type: "LINK",
            path: '/applications',
            key: '/applications',
            visibleInMenu: false,
            component: Applications,
        },
        {
            type: "LINK",
            path: '/applications/viewApplication/:id',
            // label: 'Test Sub 2',
            key: '/applications/viewApplication/:id',
            visibleInMenu: false,
            component: ApplicationView,
        },
        {
            type: "LINK",
            path: '/applications/internal-crib/:id',
            // label: 'Test Sub 2',
            key: '/applications/internal-crib/:id',
            visibleInMenu: false,
            component: InternalCrib,
        },
        ],
    },
    {
        type: "GROUP",
        label: 'Applications',
        path: '/applications',
        key: '/applications/',
        icon: <FileDoneOutlined />,
        allowedRoles: ['BM', 'ADMIN'],
        visibleInMenu: true,
        children: [{
            type: "LINK",
            path: '/applications/BM',
            key: '/applications/BM',
            visibleInMenu: true,
            label: 'Approval Workflow',
            component: Applications,
        },
        {
            type: "LINK",
            path: '/applications/BM/2ndStep',
            key: '/applications/BM/2ndStep',
            visibleInMenu: true,
            label: 'Second Meeting Pending',
            component: Applications2ndStep,
        },
        {
            type: "LINK",
            path: '/applications/viewApplication/:id',
            // label: 'Test Sub 2',
            key: '/applications/viewApplication/:id',
            visibleInMenu: false,
            component: ApplicationView,
        },
        {
            type: "LINK",
            path: '/applications/internal-crib/:id',
            // label: 'Test Sub 2',
            key: '/applications/internal-crib/:id',
            visibleInMenu: false,
            component: InternalCrib,
        },
        ],
    },
    {
        type: "LINK",
        path: "/slikRequest",
        label: 'SLIK Requests',
        key: '/slikRequest',
        icon: <DashboardOutlined />,
        visibleInMenu: true,
        allowedRoles: ['CSA', 'ADMIN', 'SLIKU'],
        // component: SlikRequests,
        children: [
            {
                type: "LINK",
                path: '/slikRequest',
                key: '/slikRequest',
                visibleInMenu: false,
                component: SlikRequests,
            },
            {
                type: "LINK",
                path: '/slikRequest/updateSlik/:id',
                key: '/updateSlik/:id',
                visibleInMenu: false,
                component: UpdateSlikRequest,
            },
            {
                type: "LINK",
                path: '/slikRequest/viewSlik/:id',
                key: '/viewSlik/:id',
                visibleInMenu: false,
                component: ViewSlikRequest,
            },
        ],
    },
    {
        type: "LINK",
        path: '/test',
        label: 'Reports',
        key: 'Reports',
        visibleInMenu: true,
        allowedRoles: ['MFO', 'CA', 'AM', 'RM', 'DIR'],
        icon: <NotificationOutlined />,
    }

]

export default sidebarMenu
