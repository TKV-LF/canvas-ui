import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material';
import { useState } from 'react';

function ButtonAction() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const ACTION_LIST = [
        {
            label: 'Chỉnh sửa vai trò',
            icon: <EditIcon></EditIcon>,
            onClick: () => {
                console.log('Chỉnh sửa vai trò');
            },
        },
        {
            label: 'Chi tiết người dùng',
            icon: <PersonIcon></PersonIcon>,
            onClick: () => {
                console.log('Chỉnh sửa vai trò');
            },
        },
        {
            label: 'Xoá khỏi khoá học',
            icon: <DeleteForeverIcon></DeleteForeverIcon>,
            onClick: () => {
                console.log('Chỉnh sửa vai trò');
            },
        },
    ];

    return (
        <>
            <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
                <MoreVertIcon></MoreVertIcon>
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List dense>
                    {ACTION_LIST.map((action, index) => (
                        <ListItem disablePadding key={index}>
                            <ListItemButton onClick={action.onClick}>
                                <ListItemIcon>{action.icon}</ListItemIcon>
                                <ListItemText primary={action.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </>
    );
}

export default ButtonAction;
