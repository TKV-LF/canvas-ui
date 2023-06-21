import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import CampaignIcon from '@mui/icons-material/Campaign';

export const PROFILE_MENU_LIST = [
    {
        label: 'Tài khoản',
        path: '/settings/profile',
        icon: <SettingsIcon></SettingsIcon>,
    },
    {
        label: 'Thông báo',
        path: '/settings/notifications',
        icon: <NotificationsIcon></NotificationsIcon>,
    },
    {
        label: 'Thông báo tổng',
        path: '/settings/announcement',
        icon: <CampaignIcon></CampaignIcon>,
    },
   
];
