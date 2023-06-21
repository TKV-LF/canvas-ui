import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CampaignIcon from '@mui/icons-material/Campaign';

export const PROFILE_MENU_LIST = [
    {
        label: 'Hồ sơ',
        path: '/profile',
        icon: <PersonIcon></PersonIcon>,
    },
    {
        label: 'Thông báo',
        path: '/profile/communication',
        icon: <NotificationsIcon></NotificationsIcon>,
    },
 
    {
        label: 'Cài đặt',
        path: '/profile/settings',
        icon: <SettingsIcon></SettingsIcon>,
    },
    {
        label: 'Thông báo tổng',
        path: '/account_notifications',
        icon: <CampaignIcon></CampaignIcon>,
    },
];
