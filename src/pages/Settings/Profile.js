import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import useHead from '~/hooks/useHead';
import EditIcon from '@mui/icons-material/Edit';
import { UserApi } from '~/services/api';

function Profile() {
    useHead({
        title: 'Thông tin cá nhân',
    });

    const [disable, setDisable] = useState(true);
    const [userInformation, setUserInformation] = useState(null);

    const { id } = JSON.parse(localStorage.getItem('user'));

    const getUserInformation = async () => {
        try {
            const response = await UserApi.getUserInformation(id);
            setUserInformation(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        const payload = {
            user: {
                name: userInformation.name,
                short_name: userInformation.short_name,
                sortable_name: userInformation.sortable_name,
            },
        };

        try {
            await UserApi.updateUserInformation(id, payload);

            notification.success({
                message: 'Success',
                description: 'Cập nhật thông tin thành công!',
            });

            setDisable(true);
        } catch (error) {
            notification.success({
                message: 'Error',
                description: error.message,
            });
        }
    };

    useEffect(() => {
        getUserInformation();
    }, []);

    if (!userInformation) return <div className="flex justify-center items-center h-96">loading... </div>;

    return (
        <>
            <div className="flex gap-3">
                <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>

                <Tooltip title="Chỉnh sửa" onClick={() => setDisable(!disable)}>
                    <IconButton aria-label="delete" size="small">
                        <EditIcon fontSize="small"></EditIcon>
                    </IconButton>
                </Tooltip>
            </div>

            <div className="mt-4 w-1/2">
                <div className="mb-2">
                    <div>Họ và tên</div>

                    <TextField
                        disabled={disable}
                        fullWidth
                        size="small"
                        value={userInformation.name}
                        variant="outlined"
                        onChange={(event) => setUserInformation({ ...userInformation, name: event.target.value })}
                    />
                    <div className="italic text-gray-500">Tên này sẽ được sử dụng để chấm điểm.</div>
                </div>

                <div className="mb-2">
                    <div>Tên hiển thị</div>

                    <TextField
                        disabled={disable}
                        fullWidth
                        size="small"
                        value={userInformation.short_name}
                        variant="outlined"
                        onChange={(event) => setUserInformation({ ...userInformation, short_name: event.target.value })}
                    />
                    <div className="italic text-gray-500">
                        Mọi người sẽ xem tên này trong phần thảo luận, tin nhắn và bình luận.
                    </div>
                </div>

                <div className="mb-2">
                    <div>Tên có thể sắp xếp</div>

                    <TextField
                        disabled={disable}
                        fullWidth
                        size="small"
                        value={userInformation.sortable_name}
                        variant="outlined"
                        onChange={(event) =>
                            setUserInformation({ ...userInformation, sortable_name: event.target.value })
                        }
                    />
                    <div className="italic text-gray-500">Tên này xuất hiện trong danh sách được sắp xếp.</div>
                </div>
            </div>

            {!disable && (
                <div className="mt-4">
                    <Button variant="contained" onClick={handleSubmit}>
                        Lưu lại
                    </Button>
                </div>
            )}
        </>
    );
}

export default Profile;
