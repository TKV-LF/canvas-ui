import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { USER_ROLES } from '~/constants';
import enrollmentApi from '~/services/api/enrollment';

function ButtonAddUser() {
    const [visible, setVisible] = useState(false);
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('StudentEnrollment');

    const { courseId } = useParams();

    const handleAddUser = async () => {
        try {
            const response = await enrollmentApi.enrollUser(courseId, {
                enrollment: {
                    user_id: Number(userId),
                    type: role,
                },
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

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

            <Dialog
                open={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Thêm người'}</DialogTitle>

                <DialogContent>
                    <div className="mb-2">
                        <div>User id</div>

                        <TextField
                            size="small"
                            fullWidth
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                        ></TextField>
                    </div>

                    <div>
                        <div>Vai trò</div>

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

                    <Button autoFocus onClick={handleAddUser}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ButtonAddUser;
