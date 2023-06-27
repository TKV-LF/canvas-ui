import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material';
import { useState } from 'react';
import enrollmentApi from '~/services/api/enrollment';
import ButtonViewUserDetail from './ButtonViewUserDetail';

function ButtonAction({ courseId, enrollmentId, enrollmentState, refresh, user }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleRemoveUser = async () => {
        try {
            await enrollmentApi.updateEnrollment({ courseId: courseId, enrollmentId: enrollmentId });
        } catch (error) {
            console.log(error);
        }
    };

    const handleToggleActive = async (task) => {
        try {
            await enrollmentApi.updateEnrollment({
                courseId: courseId,
                enrollmentId: enrollmentId,
                task: task,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleReactive = async () => {
        try {
            await enrollmentApi.reactiveEnrollment(courseId, enrollmentId);
        } catch (error) {
            console.log(error);
        }
    };

    const ACTION_LIST = [
        {
            label: 'Chi tiết người dùng',
            icon: <PersonIcon></PersonIcon>,
            visible: true,
        },
        {
            label: 'Kích hoạt người dùng',
            icon: <CheckIcon></CheckIcon>,
            visible: enrollmentState === 'inactive',
            onClick: async () => {
                await handleReactive();
                refresh();
            },
        },
        {
            label: 'Huỷ kích hoạt người dùng',
            icon: <CloseIcon></CloseIcon>,
            visible: enrollmentState !== 'inactive',
            onClick: async () => {
                if (window.confirm('Bạn có chắc chắn muốn huỷ kích hoạt người dùng này?')) {
                    await handleToggleActive('inactivate');
                    refresh();
                }
            },
        },
        {
            label: 'Xoá khỏi khoá học',
            icon: <DeleteForeverIcon></DeleteForeverIcon>,
            visible: true,
            onClick: async () => {
                if (window.confirm('Bạn có chắc chắn muốn xoá người dùng này khỏi khoá học?')) {
                    await handleRemoveUser();
                    refresh();
                }
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
                    {ACTION_LIST.map((action, index) => {
                        if (action.visible) {
                            return (
                                <ListItem key={index} onClick={action.onClick} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>{action.icon}</ListItemIcon>

                                        {action.onClick ? (
                                            <ListItemText primary={action.label}></ListItemText>
                                        ) : (
                                            <ButtonViewUserDetail user={user}></ButtonViewUserDetail>
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            );
                        } else {
                            return null;
                        }
                    })}
                </List>
            </Popover>
        </>
    );
}

export default ButtonAction;
