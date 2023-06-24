import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { PROFILE_MENU_LIST } from 'src/constants';

const SettingSideBar = () => {
    return (
        <List>
            {PROFILE_MENU_LIST.map((item) => {
                return (
                    <ListItemButton
                        key={item.path}
                        sx={{ borderRadius: '6px' }}
                        component={NavLink}
                        to={item.path}
                        style={({ isActive }) => (isActive ? { backgroundColor: '#c3ccdb' } : null)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>

                        <ListItemText primary={item.label}></ListItemText>
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default SettingSideBar;
