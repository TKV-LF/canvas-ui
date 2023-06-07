import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { PROFILE_MENU_LIST } from 'src/constants';

const ProfileSidebar = () => {
    return (
        <List>
            {PROFILE_MENU_LIST.map((item) => {
                return (
                    <ListItemButton component={NavLink} to={item.path}>
                        <ListItemIcon>{item.icon}</ListItemIcon>

                        <ListItemText primary={item.label}></ListItemText>
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default ProfileSidebar;
