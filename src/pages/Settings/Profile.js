import { IconButton, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import useHead from '~/hooks/useHead';
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
    useHead({
        title: 'Thông tin cá nhân',
    });

    const [disable, setDisable] = useState(true);

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

            <div className="mt-4">
                <div className="mb-2">
                    <div>Họ và tên</div>

                    <TextField disabled={disable} size="small" variant="outlined" />
                </div>

                <div className="mb-2">
                    <div>Tên hiển thị</div>

                    <TextField disabled={disable} size="small" variant="outlined" />
                </div>

                <div className="mb-2">
                    <div>Tên có thể sắp xếp</div>

                    <TextField disabled={disable} size="small" variant="outlined" />
                </div>

                <div className="mb-2">
                    <div>Ngôn ngữ</div>

                    <TextField disabled={disable} size="small" variant="outlined" />
                </div>
            </div>
        </>
    );
}

export default Profile;
