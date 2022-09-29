import Dashboard from 'views/examples/Dashboard.js';
import Icons from 'views/examples/Icons.js';
import Map from 'views/examples/Map.js';
import Notifications from 'views/examples/Notifications.js';
import Rtl from 'views/examples/Rtl.js';
import TableList from 'views/examples/TableList.js';
import Typography from 'views/examples/Typography.js';
import UserProfile from 'views/examples/UserProfile.js';

var routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/icons',
    name: 'Icons',
    rtlName: 'الرموز',
    icon: 'tim-icons icon-atom',
    component: Icons,
    layout: '/admin',
  },
  {
    path: '/map',
    name: 'Map',
    rtlName: 'خرائط',
    icon: 'tim-icons icon-pin',
    component: Map,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    rtlName: 'إخطارات',
    icon: 'tim-icons icon-bell-55',
    component: Notifications,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: 'tim-icons icon-single-02',
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Table List',
    rtlName: 'قائمة الجدول',
    icon: 'tim-icons icon-puzzle-10',
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Typography',
    rtlName: 'طباعة',
    icon: 'tim-icons icon-align-center',
    component: Typography,
    layout: '/admin',
  },
  {
    path: '/rtl-support',
    name: 'RTL Support',
    rtlName: 'ار تي ال',
    icon: 'tim-icons icon-world',
    component: Rtl,
    layout: '/rtl',
  },
];
export default routes;
