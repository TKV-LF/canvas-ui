import AddIcon from '@mui/icons-material/Add';
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { USER_ROLES } from '~/constants';
import { UserApi } from '~/services/api';
import enrollmentApi from '~/services/api/enrollment';
import ButtonAddNewUsers from './ButtonAddNewUsers';

function ButtonEnrollUser({ refresh }) {
    const [visible, setVisible] = useState(false);
    const [userIds, setUserIds] = useState('');
    const [listUsers, setListUsers] = useState([]);
    const [role, setRole] = useState('StudentEnrollment');

    const { courseId } = useParams();

    const handleAddUsers = async () => {
        try {
            const promises = userIds.map(async (userId) => {
                const response = await enrollmentApi.enrollUser(courseId, {
                    enrollment: {
                        user_id: Number(userId),
                        type: role,
                    },
                });
                return response;
            });

            await Promise.all(promises);

            refresh();
            setVisible(false);

            notification.success({
                message: 'Thành công',
                description: 'Thêm người dùng vào khoá học thành công.',
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getListUsersInAccount = async () => {
        try {
            const response = await UserApi.listUsersInAccount();

            setListUsers(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListUsersInAccount();
    }, []);

    if (!listUsers) return <div>Loading...</div>;

    return (
        <>
            <Button
                variant="contained"
                startIcon={<AddIcon></AddIcon>}
                disableElevation
                onClick={() => setVisible(true)}
            >
                Thêm người
            </Button>

            <Dialog open={visible} onClose={() => setVisible(false)}>
                <DialogTitle>Thêm người vào khoá học</DialogTitle>

                <DialogContent>
                    <div className="mb-2 w-[450px]">
                        <div className="font-semibold">Người dùng</div>

                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={listUsers}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            onChange={(event, value) => setUserIds(value.map((user) => user.id))}
                            renderInput={(params) => <TextField {...params} size="small"></TextField>}
                        />
                    </div>

                    <ButtonAddNewUsers refresh={() => getListUsersInAccount()}></ButtonAddNewUsers>

                    <div className="mt-2">
                        <div className="font-semibold">Vai trò</div>

                        <Select value={role} onChange={(event) => setRole(event.target.value)} size="small" fullWidth>
                            {USER_ROLES.map((role) => (
                                <MenuItem key={role.value} value={role.value}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setVisible(false)}>Thoát</Button>

                    <Button autoFocus onClick={handleAddUsers}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ButtonEnrollUser;
