import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';

function ButtonViewUserDetail({ user }) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Typography sx={{ fontSize: '14px' }} onClick={() => setVisible(true)}>
                Chi tiết người dùng
            </Typography>

            <Dialog
                open={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Chi tiết người dùng</DialogTitle>

                <DialogContent>
                    <div className="flex gap-12">
                        <div className="flex flex-col gap-2 font-semibold">
                            <div>Họ và tên:</div>
                            <div>Tên rút gọn:</div>
                            <div>Tên có thể sắp xếp:</div>
                            <div>Email:</div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div>{user.name}</div>
                            <div>{user.short_name}</div>
                            <div>{user.sortable_name}</div>
                            <div>{user.login_id}</div>
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setVisible(false)} autoFocus>
                        Thoát
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ButtonViewUserDetail;
